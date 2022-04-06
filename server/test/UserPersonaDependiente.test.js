const request = require('supertest')
const expect = require('chai').expect
const {app, db} = require('../index')
const { UserPersonaDependiente, PersonasDependientes, Users} = require("../models");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVqZW1wbG8xIiwiaWQiOjEsInJvbCI6IkFETUlOIiwiaWF0IjoxNjQ4MDQ5MjY3fQ.nVXb4qnbjSpIhknizI0tlfwyyz1S0chLNw93wbwmFjI'

const userPersonaDependiente = {
    userId: 1,
    personaDependienteId: 1
}

const userPersonaDependiente2 = {
    userId: 1,
    personaDependienteId: ""
}

const userPersonaDependiente3 = {
    userId: "a",
    personaDependienteId: 1
}

before((done) => {
    UserPersonaDependiente.destroy({
        where: {}
    })
    PersonasDependientes.create({
        nombre: "Nombre3",
        apellidos: "Apellidos3",
        enfermedad: "Enfermedad1",
        gradoDeDependencia: "45%",
        pastillasDia: "paracetamol",
        pastillasTarde: "aspirina",
        pastillasNoche: "paracetamol"
    })

    Users.create({
        nombre: "Auxiliar3",
        apellidos: "Auxiliar3",
        telefono: "129807564",
        rol: "AUXILIAR",
        username: "auxiliar3",
        password: "auxiliar3"
    })
    done()
})

describe('Add user to personaDependiente', () => {
    it('Should add an user to personaDependiente', async () => {
        const personaDependiente = await PersonasDependientes.findOne({where: {nombre: "Nombre3", apellidos: "Apellidos3", enfermedad: "Enfermedad1", gradoDeDependencia: "45%", pastillasDia: "paracetamol", pastillasTarde: "aspirina", pastillasNoche: "paracetamol"}})

        const personaDependienteId = personaDependiente.id;

        const user = await Users.findOne({where: {nombre: "Auxiliar3", apellidos: "Auxiliar3", telefono: "129807564", rol: "AUXILIAR", username: "auxiliar3", password: "auxiliar3"}})

        const userId = user.id;

        const response = await request(app).post('/userPersonaDependiente/addTo').set('accessToken', token).send({userId: userId, personaDependienteId: personaDependienteId})

        expect(response.statusCode).to.equal(200)
        expect(response.body).to.equal('SUCCESS')
    })

    it('Should not add an user to personaDependiente with an empty userId', async () => {
        const personaDependiente = await PersonasDependientes.findOne({where: {nombre: "Nombre3", apellidos: "Apellidos3", enfermedad: "Enfermedad1", gradoDeDependencia: "45%", pastillasDia: "paracetamol", pastillasTarde: "aspirina", pastillasNoche: "paracetamol"}})

        const personaDependienteId = personaDependiente.id;

        const response = await request(app).post('/userPersonaDependiente/addTo').set('accessToken', token).send({userId: "", personaDependienteId: personaDependienteId})

        expect(response.statusCode).to.equal(200)
        expect(response.body.name).to.equal('SequelizeForeignKeyConstraintError')
    })

    it('Should not add an user to personaDependiente with a string in personaDependienteId', async () => {
        const user = await Users.findOne({where: {nombre: "Auxiliar3", apellidos: "Auxiliar3", telefono: "129807564", rol: "AUXILIAR", username: "auxiliar3", password: "auxiliar3"}})

        const userId = user.id;

        const response = await request(app).post('/userPersonaDependiente/addTo').set('accessToken', token).send({userId: userId, personaDependienteId: "a"})

        expect(response.statusCode).to.equal(200)
        expect(response.body.name).to.equal('SequelizeDatabaseError')
    })
})
