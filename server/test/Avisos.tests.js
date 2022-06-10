const request = require('supertest')
const expect = require('chai').expect
const {app, db} = require('../index')
const { Avisos, PersonasDependientes, NotificacionAviso } = require("../models");
const bcrypt = require("bcryptjs");


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvb3JkaW5hZG9yMSIsImlkIjo3LCJyb2wiOiJDT09SRElOQURPUiIsImlhdCI6MTY1MTk0MDc2OH0.XVFF_BlAOCfFBRysNyvrGJ47RgGvpIa0B30VRBp78w8'

const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2UxMjM0IiwiaWQiOjE2LCJyb2wiOiJBVVhJTElBUiIsImlhdCI6MTY1Mzc1OTE4Nn0.R6AQBXJZgiyMcgzCgR-tpxJfBZBh34uZPR6L7IFeAPQ'


before( (done) => {
    Avisos.destroy({
        where: {}
    })

    NotificacionAviso.destroy({
        where: {}
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
        nombre: "Manolo",
        apellidos: "García",
        enfermedad: "Parkinson",
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
        nombre: "Juan",
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


    done()
})

describe('Avisos', () => {

    describe('Create aviso', () => {
        it('should create a new aviso', async () => {

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

            const aviso = {
                aviso: "aviso de persona",
                PersonasDependienteId: personaDependiente.id
            }

            const response = await request(app).post('/avisos/createAviso').set('accessToken', token).send(aviso)

            const notificacion = await NotificacionAviso.findAll(
                {where:
                        {
                            PersonasDependienteId: personaDependiente.id,
                        }

                })

            expect(response.statusCode).to.equal(200)
            expect(notificacion[0].nueva).to.equal(true)
            expect(response.body).to.equal('SUCCESS')
        })

        it('should not create a new Aviso with an empty aviso', async () => {

            const personaDependiente2 = await PersonasDependientes.findOne(
                {where:
                        {
                            nombre: "Juan",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol"
                        }
                })


            const aviso = {
                aviso: "",
                PersonasDependienteId: personaDependiente2.id
            }
            const response = await request(app).post('/avisos/createAviso').set('accessToken', token).send(aviso)

            const notificacion = await NotificacionAviso.findAll(
                {where:
                        {
                            PersonasDependienteId: personaDependiente2.id,
                        }

                })


            expect(response.statusCode).to.equal(200)
            expect(notificacion.length).to.equal(0)
            expect(response.body.errors[0].message).to.equal('El aviso no debe estar vacío')
        })


    })

    describe('Show aviso', () => {

        it('should show a aviso', async () => {

            const personaDependiente = await PersonasDependientes.findOne(
                {where:
                        {
                            nombre: "Ana",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol"
                        }
                })


            await Avisos.create({
                aviso: "aviso 1",
                PersonasDependienteId: personaDependiente.id
            })

            await Avisos.create({
                aviso: "aviso 2",
                PersonasDependienteId: personaDependiente.id
            })

            await NotificacionAviso.create({
                nueva: true,
                PersonasDependienteId: personaDependiente.id

            })


            listAvisos = await Avisos.findAll({
                where: {
                    PersonasDependienteId: personaDependiente.id,
                }})


            const response = await request(app).get(`/avisos/showAvisos/${personaDependiente.id}`).set('accessToken', token)

            const notificacion = await NotificacionAviso.findAll(
                {where:
                        {
                            PersonasDependienteId: personaDependiente.id,
                        }

                })

            expect(notificacion[0].nueva).to.equal(true)
            expect(response.statusCode).to.equal(200)
            expect(listAvisos.length).to.equal(response.body.length)
        })

        it('should show a aviso as auxiliar', async () => {

            const personaDependiente = await PersonasDependientes.findOne(
                {where:
                        {
                            nombre: "Manolo",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol"
                        }
                })

            await Avisos.create({
                aviso: "aviso 1",
                PersonasDependienteId: personaDependiente.id
            })

            await Avisos.create({
                aviso: "aviso 2",
                PersonasDependienteId: personaDependiente.id
            })

            await NotificacionAviso.create({
                nueva: true,
                PersonasDependienteId: personaDependiente.id

            })

            listAvisos = await Avisos.findAll({
                where: {
                    PersonasDependienteId: personaDependiente.id,
                }})

            const response = await request(app).get(`/avisos/showAvisos/${personaDependiente.id}`).set('accessToken', token2)

            const notificacion = await NotificacionAviso.findAll(
                {where:
                        {
                            PersonasDependienteId: personaDependiente.id,
                        }

                })

            expect(notificacion[0].nueva).to.equal(false)
            expect(response.statusCode).to.equal(200)
            expect(listAvisos.length).to.equal(response.body.length)
        })

    })

    describe('Delete aviso', () => {

        it('Should delete a aviso', async () => {


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

            await Avisos.create({
                aviso: "aviso 4",
                PersonasDependienteId: personaDependiente.id
            })

            await Avisos.create({
                aviso: "aviso 6",
                PersonasDependienteId: personaDependiente.id
            })


            const aviso = await Avisos.findOne({where: {
                    aviso: "aviso 6",
                    PersonasDependienteId: personaDependiente.id,
                }})


            const listAvisos = await Avisos.findAll()
            const response = await request(app).del(`/avisos/deleteAviso/${aviso.id}`)
                .set('accessToken', token)

            const listAvisos2 = await Avisos.findAll()



            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal("DELETED SUCCESSFULLY")
            expect(listAvisos2.length).to.equal(listAvisos.length - 1)


        })

        it('Should not delete a aviso with an incorrect id', async () => {
            const avisoId = 96534523
            const listaAvisos = await Avisos.findAll()
            const response = await request(app).del(`/avisos/deleteAviso/${avisoId}`)
                .set('accessToken', token)

            const listaAvisos2 = await Avisos.findAll()

            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal("There is no aviso with this id")
            expect(listaAvisos.length).to.equal(listaAvisos2.length)
        })

    })


})


after(done => {
    db.sequelize.close()
    done()
})
