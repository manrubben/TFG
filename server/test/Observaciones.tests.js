const request = require('supertest')
const expect = require('chai').expect
const {app, db} = require('../index')
const { Observaciones, PersonasDependientes, Users } = require("../models");


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvb3JkaW5hZG9yMSIsImlkIjo3LCJyb2wiOiJDT09SRElOQURPUiIsImlhdCI6MTY1MTk0MDc2OH0.XVFF_BlAOCfFBRysNyvrGJ47RgGvpIa0B30VRBp78w8'



const personaDependiente = {
    nombre: "Nombre3",
    apellidos: "Apellidos3",
    enfermedad: "Enfermedad1",
    gradoDeDependencia: "45%",
    pastillasDia: "paracetamol",
    pastillasTarde: "aspirina",
    pastillasNoche: "paracetamol"
}

const observacion1 = {
    titulo: "titulo1",
    descripcion: "descripcion de la observacion",
    PersonasDependienteId: personaDependiente.id
}

const observacion2 = {
    titulo: "",
    descripcion: "descripcion de la observacion",
    PersonasDependienteId: personaDependiente.id
}

const observacion3 = {
    titulo: "titulo1",
    descripcion: "",
    PersonasDependienteId: personaDependiente.id
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

    Observaciones.create({
        titulo: "observacion",
        descripcion: "esto es una observacion",
        username: "pepito",
        PersonasDependienteId: 1,
        UserId: 10
    })


    Observaciones.create({
        titulo: "observacion2",
        descripcion: "esto es una observacion NUEVA",
        username: "pepito",
        PersonasDependienteId: 1,
        UserId: 10
    })

    done()
})

describe('Observaciones', () => {

    describe('Create observacion', () => {
        it('should create a new Observacion', async () => {
            const response = await request(app).post('/observaciones/createObservacion').set('accessToken', token).send(observacion1)
            console.log(response.body)
            expect(response.statusCode).to.equal(200)
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

            await Observaciones.create({
                titulo: "observacion",
                descripcion: "esto es una observacion",
                username: "pepito",
                PersonasDependienteId: personaDependiente.id,
                UserId: 10
            })

            listObservaciones = await Observaciones.findAll({
                where: {
                    PersonasDependienteId: personaDependiente.id,
                }})
            const response = await request(app).get(`/observaciones/showObservaciones/1`).set('accessToken', token)



            expect(response.statusCode).to.equal(200)
            expect(listObservaciones.length).to.equal(1)
        })

    })

    describe('Delete observacion', () => {

        it('Should delete a observacion', async () => {

            const listUsers = await Users.findAll();

            console.log(listUsers)

            await Observaciones.create({
                titulo: "observacion",
                descripcion: "esto es una observacion",
                username: "pepito",
                PersonasDependienteId: 1,
                UserId: 10
            })

            const observacion = await Observaciones.findOne({where: {
                    titulo: "observacion",
                    descripcion: "esto es una observacion",
                    username: "pepito",
                    PersonasDependienteId: 1,
                    UserId: 10
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
            const observacionId = 9
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
