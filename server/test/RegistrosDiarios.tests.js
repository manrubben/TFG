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

    PersonasDependientes.destroy({
        where:{}
    })


    PersonasDependientes.create({
        nombre: "Antonio",
        apellidos: "García",
        enfermedad: "Parkinson",
        gradoDeDependencia: "60%",
        pastillasDia: "paracetamol",
        pastillasTarde: "aspirina",
        pastillasNoche: "paracetamol"
    })

    PersonasDependientes.create({
        nombre: "Angela",
        apellidos: "Perez",
        enfermedad: "Alzheimer",
        gradoDeDependencia: "60%",
        pastillasDia: "paracetamol",
        pastillasTarde: "aspirina",
        pastillasNoche: "paracetamol"
    })

    PersonasDependientes.create({
        nombre: "Ana",
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

    PersonasDependientes.create({
        nombre: "Pepe",
        apellidos: "García",
        enfermedad: "Parkinson",
        gradoDeDependencia: "60%",
        pastillasDia: "paracetamol",
        pastillasTarde: "aspirina",
        pastillasNoche: "paracetamol"
    })

    PersonasDependientes.create({
        nombre: "Benito",
        apellidos: "García",
        enfermedad: "Parkinson",
        gradoDeDependencia: "60%",
        pastillasDia: "paracetamol",
        pastillasTarde: "aspirina",
        pastillasNoche: "paracetamol"
    })

    bcrypt.hash("auxiliar1", 10).then((hash) => {
        Users.create({
            nombre: "Auxiliar1",
            apellidos: "Auxiliar1",
            telefono: 123456789,
            rol: "AUXILIAR",
            username: "auxiliar1",
            password: hash,
        });
    });

    bcrypt.hash("auxiliar1", 10).then((hash) => {
        Users.create({
            nombre: "Auxiliar2",
            apellidos: "Auxiliar1",
            telefono: 123456789,
            rol: "AUXILIAR",
            username: "auxiliar1",
            password: hash,
        });
    });

    done()

})

describe('Registros diarios', () => {

    describe('Create registro', () => {
        it('should create a new registro', async () => {


            const personaDependiente = await PersonasDependientes.findOne(
                {where:
                        {
                            nombre: "Ana",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol",
                        }
                })

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
                PersonasDependienteId: personaDependiente.id,
            }


            const response = await request(app).post('/registrosDiarios/addRegistro').set('accessToken', token).send(registro1)


            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')


        })

        it('should not create a new registro', async () => {

            const hoy = new Date(Date.now());
            const mes = hoy.getMonth()+1;
            const hoyString = hoy.toLocaleDateString();

            const personaDependiente = await PersonasDependientes.findOne(
                {where:
                        {
                            nombre: "Pepe",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol"
                        }
                })

            await RegistrosDiarios.create({
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
                PersonasDependienteId: personaDependiente.id
            })

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
                PersonasDependienteId: personaDependiente.id,
            }


            const response = await request(app).post('/registrosDiarios/addRegistro').set('accessToken', token).send(registro1)


            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal('Ya hay un registro con esta fecha')

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

            const user = await Users.findOne(
                {where:
                        {
                            nombre: "Auxiliar1",
                            apellidos: "Auxiliar1",
                            telefono: 123456789,
                            rol: "AUXILIAR",
                            username: "auxiliar1"
                        }
                })

            const auxiliar = {
                auxiliarId: user.id,
            }


            await RegistrosDiarios.create({
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
                PersonasDependienteId: personaDependiente.id
            })

            const response = await request(app).post(`/registrosDiarios/addAuxiliarRegistro/${personaDependiente.id}`).set('accessToken', token).send(auxiliar);

            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')

        })

        it('should not add auxiliar', async () => {

            const hoy = new Date(Date.now());
            const mes = hoy.getMonth()+1;
            const hoyString = hoy.toLocaleDateString();

            const personaDependiente = await PersonasDependientes.findOne(
                {where:
                        {
                            nombre: "Benito",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol"
                        }
                })

            const user = await Users.findOne(
                {where:
                        {
                            nombre: "Auxiliar1",
                            apellidos: "Auxiliar1",
                            telefono: 123456789,
                            rol: "AUXILIAR",
                            username: "auxiliar1"
                        }
                })

            await RegistrosDiarios.create({
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
                PersonasDependienteId: personaDependiente.id
            })

            const registro = await RegistrosDiarios.findOne(
                {where:
                        {
                            fecha: hoyString,
                            PersonasDependienteId: personaDependiente.id,

                        }
                })

            await AuxiliaresRegistros.create({
                registroId: registro.id,
                auxiliarId: user.id
                })

            const auxiliar = {
                auxiliarId: user.id,
            }



            const response = await request(app).post(`/registrosDiarios/addAuxiliarRegistro/${personaDependiente.id}`).set('accessToken', token).send(auxiliar);

            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal('El auxiliar ya está asociado al registro')

        })

    })


    describe('Edit Registro', () =>{
        it('should edit registro', async () => {

            const hoy = new Date(Date.now());
            const mes = hoy.getMonth()+1;
            const hoyString = hoy.toLocaleDateString();

            const personaDependiente = await PersonasDependientes.findOne(
                {where:
                        {
                            nombre: "Antonio",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol"
                        }
                })

            await RegistrosDiarios.create({
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
                PersonasDependienteId: personaDependiente.id
            })

            const registro = await RegistrosDiarios.findOne(
                {where:
                        {
                            fecha: hoyString,
                            PersonasDependienteId: personaDependiente.id,

                        }
                })

            const registro1 = {
                desayuno: "Nada",
                almuerzo: "Filetes a la plancha",
                merienda: "Fruta",
                cena: "Sopa",
                pasosDiarios: 500,
                actividadFisica: "Andar",
                horasSueno: 7.5,
                tiempoAireLibre: "tiempoAireLibre",
                relacionSocial: "relacionSocial",
                PersonasDependienteId: personaDependiente.id,
            }


            const response = await request(app).put(`/registrosDiarios/registro/edit/${registro.id}`).set('accessToken', token).send(registro1)


            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')

        })

        it('should not edit registro', async () => {

            const personaDependiente = await PersonasDependientes.findOne(
                {where:
                        {
                            nombre: "Antonio",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol"
                        }
                })

            const registro1 = {
                desayuno: "Nada",
                almuerzo: "Filetes a la plancha",
                merienda: "Fruta",
                cena: "Sopa",
                pasosDiarios: 500,
                actividadFisica: "Andar",
                horasSueno: 7.5,
                tiempoAireLibre: "tiempoAireLibre",
                relacionSocial: "relacionSocial",
                PersonasDependienteId: personaDependiente.id,
            }

            const registroId = 12424566757

            const response = await request(app).put(`/registrosDiarios/registro/edit/${registroId}`).set('accessToken', token).send(registro1)

            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal('There is no registro with this id')

        })

    })

    describe('Show Registro', () => {
        it('should show a registro', async () => {

            const hoy = new Date(Date.now());
            const mes = hoy.getMonth() + 1;

            const personaDependiente = await PersonasDependientes.findOne(
                {
                    where:
                        {
                            nombre: "Antonio",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol"
                        }
                })

            await RegistrosDiarios.create({
                fecha: "20/5/2022",
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
                PersonasDependienteId: personaDependiente.id
            })

            const registro = await RegistrosDiarios.findOne(
                {
                    where:
                        {
                            fecha: "20/5/2022",
                            PersonasDependienteId: personaDependiente.id,

                        }
                })

            const response = await request(app).get(`/registrosDiarios/showRegistroEdit/${registro.id}`).set('accessToken', token)

            expect(response.statusCode).to.equal(200)
            expect(response.body.desayuno).to.equal(registro.desayuno)
            expect(response.body.pasosDiarios).to.equal(registro.pasosDiarios)

        })

        it('should show a mes', async () => {

            const personaDependiente = await PersonasDependientes.findOne(
                {
                    where:
                        {
                            nombre: "Angela",
                            apellidos: "Perez",
                            enfermedad: "Alzheimer",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol"
                        }
                })

            await RegistrosDiarios.create({
                fecha: "20/3/2022",
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
                mes: 3,
                PersonasDependienteId: personaDependiente.id
            })

            await RegistrosDiarios.create({
                fecha: "15/3/2022",
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
                mes: 3,
                PersonasDependienteId: personaDependiente.id
            })

            const registrosMes = await RegistrosDiarios.findAll(
                {
                    where:
                        {
                            mes: 3,
                            PersonasDependienteId: personaDependiente.id,

                        }
                })

            const response = await request(app).get(`/registrosDiarios/showRegistrosMes/${personaDependiente.id}?mes=3`).set('accessToken', token)

            expect(response.statusCode).to.equal(200)
            expect(response.body.length).to.equal(registrosMes.length)

        })

    })


})

after(done => {
    db.sequelize.close()
    done()
})
