const request = require('supertest')
const expect = require('chai').expect
const {app, db} = require('../index')
const { Observaciones, PersonasDependientes, Users, NotificacionObservacion } = require("../models");
const bcrypt = require("bcryptjs");


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvb3JkaW5hZG9yMSIsImlkIjo3LCJyb2wiOiJDT09SRElOQURPUiIsImlhdCI6MTY1MTk0MDc2OH0.XVFF_BlAOCfFBRysNyvrGJ47RgGvpIa0B30VRBp78w8'

const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlZHJvbWFydGluZXoiLCJpZCI6MTUsInJvbCI6IkZBTUlMSUFSIiwiaWF0IjoxNjUzMTI2MDUyfQ.GPaQ5CPAMWp9rcfi4mj4_jsxaaxhjapjFTNVM5OQKa4'

const personaDependiente = {
    nombre: "Nombre3",
    apellidos: "Apellidos3",
    enfermedad: "Enfermedad1",
    gradoDeDependencia: "45%",
    pastillasDia: "paracetamol",
    pastillasTarde: "aspirina",
    pastillasNoche: "paracetamol"
}



const observacion2 = {
    titulo: "",
    descripcion: "descripcion de la observacion",
    username: "pepito",
    PersonasDependienteId: personaDependiente.id,
    UserId: 4
}

const observacion3 = {
    titulo: "titulo1",
    descripcion: "",
    username: "pepito",
    PersonasDependienteId: personaDependiente.id,
    UserId: 4
}

before( (done) => {
    Observaciones.destroy({
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

    Observaciones.create({
        titulo: "observacion",
        descripcion: "esto es una observacion",
        username: "pepito",
        PersonasDependienteId: 1,
        UserId: 10
    })


    done()
})

describe('Observaciones', () => {

    describe('Create observacion', () => {
        it('should create a new Observacion', async () => {



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

            const observacion1 = {
                titulo: "titulo1",
                descripcion: "descripcion de la observacion",
                username: user.username,
                PersonasDependienteId: personaDependiente.id,
                UserId: user.id
            }

            const response = await request(app).post('/observaciones/createObservacion').set('accessToken', token).send(observacion1)

            const notificacion = await NotificacionObservacion.findAll(
                {where:
                        {
                            PersonasDependienteId: personaDependiente.id,
                        }

                })
            console.log(observacion1)
            expect(response.statusCode).to.equal(200)
            expect(notificacion[0].nueva).to.equal(true)
            expect(response.body).to.equal('SUCCESS')
        })

        it('should not create a new Observacion with an empty titulo', async () => {
            const response = await request(app).post('/observaciones/createObservacion').set('accessToken', token).send(observacion2)
            expect(response.statusCode).to.equal(200)
            expect(response.body.errors[0].message).to.equal('El título no debe estar vacío')
        })

        it('should not create a new Observacion with an empty descripcion', async () => {
            const response = await request(app).post('/observaciones/createObservacion').set('accessToken', token).send(observacion3)
            expect(response.statusCode).to.equal(200)
            expect(response.body.errors[0].message).to.equal('La descripción no debe estar vacío')
        })


    })

    describe('Show observacion', () => {

        it('should show a observacion', async () => {

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
                            username: "auxiliar1",
                        }
                }
            )


            await Observaciones.create({
                titulo: "observacion",
                descripcion: "esto es una observacion",
                username: user.username,
                PersonasDependienteId: personaDependiente.id,
                UserId: user.id,
            })

            await Observaciones.create({
                titulo: "observacion 2",
                descripcion: "esto es una observacion mas",
                username: user.username,
                PersonasDependienteId: personaDependiente.id,
                UserId: user.id,
            })

            listObservaciones = await Observaciones.findAll({
                where: {
                    PersonasDependienteId: personaDependiente.id,
                }})

            //console.log(listObservaciones)
            const response = await request(app).get(`/observaciones/showObservaciones/${personaDependiente.id}`).set('accessToken', token)

            const notificacion = await NotificacionObservacion.findAll(
                {where:
                        {
                            PersonasDependienteId: personaDependiente.id,
                        }

                })

            expect(notificacion[0].nueva).to.equal(true)
            expect(response.statusCode).to.equal(200)
            expect(listObservaciones.length).to.equal(response.body.length)
        })

        it('should show a observacion as familiar', async () => {

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
                            username: "auxiliar1",
                        }
                }
            )


            await Observaciones.create({
                titulo: "observacion",
                descripcion: "esto es una observacion",
                username: user.username,
                PersonasDependienteId: personaDependiente.id,
                UserId: user.id,
            })

            await Observaciones.create({
                titulo: "observacion 2",
                descripcion: "esto es una observacion mas",
                username: user.username,
                PersonasDependienteId: personaDependiente.id,
                UserId: user.id,
            })

            listObservaciones = await Observaciones.findAll({
                where: {
                    PersonasDependienteId: personaDependiente.id,
                }})

            //console.log(listObservaciones)
            const response = await request(app).get(`/observaciones/showObservaciones/${personaDependiente.id}`).set('accessToken', token2)

            const notificacion = await NotificacionObservacion.findAll(
                {where:
                        {
                            PersonasDependienteId: personaDependiente.id,
                        }

                })

            expect(notificacion[0].nueva).to.equal(false)
            expect(response.statusCode).to.equal(200)
            expect(listObservaciones.length).to.equal(response.body.length)
        })

    })

    describe('Delete observacion', () => {

        it('Should delete a observacion', async () => {

            const listUsers = await Users.findAll();

            console.log(listUsers)

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
                            username: "auxiliar1",
                        }
                }
            )

            await Observaciones.create({
                titulo: "observacion",
                descripcion: "esto es una observacion",
                username: user.username,
                PersonasDependienteId: personaDependiente.id,
                UserId: user.id,
            })

            await Observaciones.create({
                titulo: "observacion 2",
                descripcion: "esto es una observacion mas",
                username: user.username,
                PersonasDependienteId: personaDependiente.id,
                UserId: user.id,
            })


            const observacion = await Observaciones.findOne({where: {
                    titulo: "observacion",
                    descripcion: "esto es una observacion",
                    username: user.username,
                    PersonasDependienteId: personaDependiente.id,
                    UserId: user.id
                }})

            console.log(observacion)

            const listObservaciones = await Observaciones.findAll()
            const response = await request(app).del(`/observaciones/deleteObservacion/${observacion.id}`)
                .set('accessToken', token)

            const listObservaciones2 = await Observaciones.findAll()



            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal("DELETED SUCCESSFULLY")
            expect(listObservaciones2.length).to.equal(listObservaciones.length - 1)


        })

        it('Should not delete a observacion with an incorrect id', async () => {
            const observacionId = 96534523
            const listaObservaciones = await Observaciones.findAll()
            const response = await request(app).del(`/observaciones/deleteObservacion/${observacionId}`)
                .set('accessToken', token)

            const listaObservaciones2 = await Observaciones.findAll()

            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal("There is no observacion with this id")
            expect(listaObservaciones.length).to.equal(listaObservaciones2.length)
        })

    })


})


after(done => {
    db.sequelize.close()
    done()
})
