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

after(done => {
    db.sequelize.close()
    done()
})
