const request = require('supertest')
const expect = require('chai').expect
const {app, db} = require('../index')
const { RegistrosDiarios, PersonasDependientes, Users, AuxiliaresRegistros } = require("../models");
const bcrypt = require("bcryptjs");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvb3JkaW5hZG9yMSIsImlkIjo3LCJyb2wiOiJDT09SRElOQURPUiIsImlhdCI6MTY1MTk0MDc2OH0.XVFF_BlAOCfFBRysNyvrGJ47RgGvpIa0B30VRBp78w8'

before( (done) => {

    RegistrosDiarios.destroy({
        where: {}
    })

    AuxiliaresRegistros.destroy({
        where: {}
    })

    PersonasDependientes.create({
        nombre: "Manolo",
        apellidos: "García",
        enfermedad: "Parkinson",
        gradoDeDependencia: "60%",
        pastillasDia: "paracetamol",
        pastillasTarde: "aspirina",
        pastillasNoche: "paracetamol"
    })

    PersonasDependientes.create({
        nombre: "Javier",
        apellidos: "García",
        enfermedad: "Parkinson",
        gradoDeDependencia: "60%",
        pastillasDia: "paracetamol",
        pastillasTarde: "aspirina",
        pastillasNoche: "paracetamol"
    })



    done()


})

describe('Registros diarios', () => {

    describe('Create registro', () => {
        it('should create a new registro', async (done) => {

            const hoy = new Date(Date.now());
            const hoyString = hoy.toLocaleDateString();

            const personaDependiente = await PersonasDependientes.findOne(
                {where:
                        {
                            nombre: "Manolo",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol",
                        }
                })

            //console.log(personaDependiente)

            const registro1 = {
                desayuno: "Tostada",
                almuerzo: "Filetes a la plancha",
                merienda: "Fruta",
                cena: "Sopa",
                pasosDiarios: 500,
                actividadFisica: "Andar",
                horasSueno: 7.5,
                tiempoAireLibre: "tiempoAireLibre",
                relacionSocial: "relacionSocial",
                PersonasDependiente: personaDependiente.id,
            }

            console.log(registro1)

            const response = await request(app).post('/registrosDiarios/addRegistro').set('accessToken', token).send(registro1)

            console.log(response)

            const registrp = await RegistrosDiarios.findOne(
                {where:
                        {
                            fecha: hoyString,
                            PersonasDependiente: personaDependiente.id,

                        }
                })

            console.log(registrp)

            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')

            done()

        })

    })


    describe('Add auxiliar to registro', () =>{

        it('should add auxiliar', async () => {

            const hoy = new Date(Date.now());
            const mes = hoy.getMonth()+1;
            const hoyString = hoy.toLocaleDateString();

            const personaDependiente = await PersonasDependientes.findOne(
                {where:
                        {
                            nombre: "Javier",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol"
                        }
                })

            RegistrosDiarios.create({
                fecha:hoyString,
                desayuno: "Tostada",
                almuerzo: "Filetes a la plancha",
                merienda: "Fruta",
                cena: "Sopa",
                pasosDiarios: 500,
                actividadFisica: "Andar",
                horasSueno: 7.5,
                tiempoAireLibre: "tiempoAireLibre",
                relacionSocial: "relacionSocial",
                medicacionManana: false,
                medicacionTarde: false,
                medicacionNoche: false,
                mes: mes,
                PersonasDependiente: personaDependiente.id
            })

            const response = await request(app).post(`/registrosDiarios/addAuxiliarRegistro/${personaDependiente.id}`).set('accessToken', token).send();

            console.log(response)
            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')

        })
    })


})

after(done => {
    db.sequelize.close()
    done()
})
