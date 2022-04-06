const request = require('supertest')
const expect = require('chai').expect
const {app, db} = require('../index')
const { PersonasDependientes } = require("../models");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVqZW1wbG8xIiwiaWQiOjEsInJvbCI6IkFETUlOIiwiaWF0IjoxNjQ4MDQ5MjY3fQ.nVXb4qnbjSpIhknizI0tlfwyyz1S0chLNw93wbwmFjI'

const personaDependiente = {
    nombre: "Nombre3",
    apellidos: "Apellidos3",
    enfermedad: "Enfermedad1",
    gradoDeDependencia: "45%",
    pastillasDia: "paracetamol",
    pastillasTarde: "aspirina",
    pastillasNoche: "paracetamol"
}

const personaDependiente2 = {
    nombre: "",
    apellidos: "Apellidos3",
    enfermedad: "Enfermedad1",
    gradoDeDependencia: "45%",
    pastillasDia: "paracetamol",
    pastillasTarde: "aspirina",
    pastillasNoche: "paracetamol"
}

const personaDependiente3 = {
    nombre: "Nombre3",
    apellidos: "",
    enfermedad: "Enfermedad1",
    gradoDeDependencia: "45%",
    pastillasDia: "paracetamol",
    pastillasTarde: "aspirina",
    pastillasNoche: "paracetamol"
}

const personaDependiente4 = {
    nombre: "Nombre3",
    apellidos: "Apellidos3",
    enfermedad: "",
    gradoDeDependencia: "45%",
    pastillasDia: "paracetamol",
    pastillasTarde: "aspirina",
    pastillasNoche: "paracetamol"
}

before((done) => {
    PersonasDependientes.destroy({
        where: {}
    })
    done()
})


describe('PersonasDependientes', () => {

    describe('Create persona dependiente', () => {
        it('should create a new PersonaDependiente', async () => {
            const response = await request(app).post('/personasDependientes/create').set('accessToken', token).send(personaDependiente)
            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
        })

        it('should not create a new PersonaDependiente with an empty name', async () => {
            const response = await request(app).post('/personasDependientes/create').set('accessToken', token).send(personaDependiente2)
            expect(response.statusCode).to.equal(200)
            expect(response.body.errors[0].message).to.equal('El nombre no puede estar vacío')
        })

        it('should not create a new PersonaDependiente with an empty apellidos', async () => {
            const response = await request(app).post('/personasDependientes/create').set('accessToken', token).send(personaDependiente3)
            expect(response.statusCode).to.equal(200)
            expect(response.body.errors[0].message).to.equal('Los apellidos no pueden estar vacíos')
        })

        it('should not create a new PersonaDependiente with an empty enfermedad', async () => {
            const response = await request(app).post('/personasDependientes/create').set('accessToken', token).send(personaDependiente4)
            expect(response.statusCode).to.equal(200)
            expect(response.body.errors[0].message).to.equal('La enfermedad no puede estar vacía')
        })

    })

    describe('Show persona dependiente', () => {

        it('should show a persona dependiente', async () => {
            const personaDependiente = await PersonasDependientes.findOne({where: {nombre: "Nombre3", apellidos: "Apellidos3", enfermedad: "Enfermedad1", gradoDeDependencia: "45%", pastillasDia: "paracetamol", pastillasTarde: "aspirina", pastillasNoche: "paracetamol"}})
            const response = await request(app).get(`/personasDependientes/show/${personaDependiente.id}`).set('accessToken', token)

            expect(response.statusCode).to.equal(200)
            expect(response.body.nombre).to.equal(personaDependiente.nombre)
            expect(response.body.apellidos).to.equal(personaDependiente.apellidos)
        })

        it('should not show a persona dependiente with an incorrect id', async () => {
            const personaDependienteId = 9898782762636536276
            const response = await request(app).get(`/personasDependientes/show/${personaDependienteId}`).set('accessToken', token)

            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal('There is no personaDependiente with this id')
        })

    })

    describe('Update persona dependiente', () => {

        it('should update a persona dependiente', async () => {

            const data = {
                nombre: "Pepe",
                apellidos: "Rodriguez",
                enfermedad: "Enfermedad7",
                gradoDeDependencia: "33%",
                pastillasDia: "paracetamol",
                pastillasTarde: "dormidina",
                pastillasNoche: "aspirina"
            }

            const personaDependiente = await PersonasDependientes.findOne({where: {nombre: "Nombre3", apellidos: "Apellidos3", enfermedad: "Enfermedad1", gradoDeDependencia: "45%", pastillasDia: "paracetamol", pastillasTarde: "aspirina", pastillasNoche: "paracetamol"}})
            const response = await request(app).put(`/personasDependientes/edit/${personaDependiente.id}`)
                .set('accessToken', token)
                .send(data)

            const personaDependienteUpdated = await PersonasDependientes.findByPk(personaDependiente.id)

            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
            expect(personaDependienteUpdated.nombre).to.equal(data.nombre)
            expect(personaDependienteUpdated.apellidos).to.equal(data.apellidos)
            expect(personaDependienteUpdated.enfermedad).to.equal(data.enfermedad)
        })

        it('Should not update a persona dependiente with empty values', async () => {

            const data = {
                nombre: "",
                apellidos: "Rodriguez",
                enfermedad: "Enfermedad7",
                gradoDeDependencia: "33%",
                pastillasDia: "",
                pastillasTarde: "dormidina",
                pastillasNoche: "aspirina"
            }

            const personaDependiente = await PersonasDependientes.findOne({where: {nombre: "Nombre3", apellidos: "Apellidos3", enfermedad: "Enfermedad1", gradoDeDependencia: "45%", pastillasDia: "paracetamol", pastillasTarde: "aspirina", pastillasNoche: "paracetamol"}})
            const response = await request(app).put(`/personasDependientes/edit/${personaDependiente.id}`)
                .set('accessToken', token)
                .send(data)

            expect(response.statusCode).to.equal(200)
            expect(response.body.name).to.equal('SequelizeValidationError')
        })

        it('Should not update a persona dependiente with an incorrect id', async () => {
            const data = {
                nombre: "Pepe",
                apellidos: "Rodriguez",
                enfermedad: "Enfermedad7",
                gradoDeDependencia: "33%",
                pastillasDia: "paracetamol",
                pastillasTarde: "dormidina",
                pastillasNoche: "aspirina"
            }

            const personaDependienteId = 101010010820128018201
            const response = await request(app).put(`/personasDependientes/edit/${personaDependiente.id}`)
                .set('accessToken', token)
                .send(data)

            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal('There is no personaDependiente with this id')
        })

    })

})



after(done => {
    db.sequelize.close()
    done()
})
