const request = require('supertest')
const expect = require('chai').expect
const {app, db} = require('../index')
const { UserPersonaDependiente, PersonasDependientes, Users} = require("../models");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVqZW1wbG8xIiwiaWQiOjEsInJvbCI6IkFETUlOIiwiaWF0IjoxNjQ4MDQ5MjY3fQ.nVXb4qnbjSpIhknizI0tlfwyyz1S0chLNw93wbwmFjI'



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

    PersonasDependientes.create({
        nombre: "Javier",
        apellidos: "García",
        enfermedad: "Enfermedad3",
        gradoDeDependencia: "13%",
        pastillasDia: "aspirina",
        pastillasTarde: "aspirina",
        pastillasNoche: "dormidina"
    })

    Users.create({
        nombre: "Auxiliar3",
        apellidos: "Auxiliar3",
        telefono: "129807564",
        rol: "AUXILIAR",
        username: "auxiliar3",
        password: "auxiliar3"
    })

    Users.create({
        nombre: "Familiar1",
        apellidos: "Familiar1",
        telefono: "129807564",
        rol: "FAMILIAR",
        username: "familiar1",
        password: "familiar1"
    })
    done()
})

describe('UserPersonaDependiente tests', () => {
    describe('Add user to personaDependiente', () => {
        it('Should add an user to personaDependiente', async () => {
            const personaDependiente = await PersonasDependientes.findOne({where: {nombre: "Nombre3", apellidos: "Apellidos3", enfermedad: "Enfermedad1", gradoDeDependencia: "45%", pastillasDia: "paracetamol", pastillasTarde: "aspirina", pastillasNoche: "paracetamol"}})

            const personaDependienteId = personaDependiente.id;

            const user = await Users.findOne({where: {nombre: "Auxiliar3", apellidos: "Auxiliar3", telefono: "129807564", rol: "AUXILIAR", username: "auxiliar3", password: "auxiliar3"}})

            const userId = user.id;

            const response = await request(app).post('/userPersonaDependiente/addTo')
                .set('accessToken', token)
                .send({userId: userId, personaDependienteId: personaDependienteId})

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

    describe('Delete user of persona dependiente', () => {

        it('Should delete a user of persona dependiente', async () => {
            const personaDependiente = await PersonasDependientes.findOne({where: {nombre: "Nombre3", apellidos: "Apellidos3", enfermedad: "Enfermedad1", gradoDeDependencia: "45%", pastillasDia: "paracetamol", pastillasTarde: "aspirina", pastillasNoche: "paracetamol"}})
            const personaDependienteId = personaDependiente.id;
            const user = await Users.findOne({where: {nombre: "Auxiliar3", apellidos: "Auxiliar3", telefono: "129807564", rol: "AUXILIAR", username: "auxiliar3", password: "auxiliar3"}})
            const userId = user.id;
            const lista = await UserPersonaDependiente.findAll();

            const response = await request(app).del('/userPersonaDependiente/delete')
                .set('accessToken', token)
                .send({userId: userId, personaDependienteId: personaDependienteId})
            const lista2 = await UserPersonaDependiente.findAll();

            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
            expect(lista2.length).to.equal(lista.length-1)
        })

        it('Should not delete a user of persona dependiente with an incorrect id', async () => {
            const personaDependienteId = 182783689193747817812
            const userId = 9827861098398847814719387
            const lista = await UserPersonaDependiente.findAll();
            const response = await request(app).del('/userPersonaDependiente/delete')
                .set('accessToken', token)
                .send({userId: userId, personaDependienteId: personaDependienteId})
            const lista2 = await UserPersonaDependiente.findAll();

            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal('There is no userPersonaDependiente with this id')
            expect(lista2.length).to.equal(lista.length)
        })

    })

    describe('Add familiar to persona dependiente', () => {

        it('Should add a familiar to persona dependiente', async () => {
            const personaDependiente = await PersonasDependientes.findOne({where: {nombre: "Nombre3", apellidos: "Apellidos3", enfermedad: "Enfermedad1", gradoDeDependencia: "45%", pastillasDia: "paracetamol", pastillasTarde: "aspirina", pastillasNoche: "paracetamol"}})
            const personaDependienteId = personaDependiente.id;

            const lista = await UserPersonaDependiente.findAll();

            const response = await request(app).post(`/userPersonaDependiente/personaDependiente/${personaDependienteId}/addFamiliar`)
                .set('accessToken', token)
                .send({nombre: "Familiar1",
                    apellidos: "Familiar1",
                    telefono: "129807564",
                    rol: "FAMILIAR",
                    username: "familiar1"})
            const lista2 = await UserPersonaDependiente.findAll();

            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
            expect(lista2.length).to.equal(lista.length+1)
        })

        it('Should not add a familiar to persona dependiente with incorrect familiar data', async () => {
            const personaDependiente = await PersonasDependientes.findOne({where: {nombre: "Nombre3", apellidos: "Apellidos3", enfermedad: "Enfermedad1", gradoDeDependencia: "45%", pastillasDia: "paracetamol", pastillasTarde: "aspirina", pastillasNoche: "paracetamol"}})
            const personaDependienteId = personaDependiente.id;

            const lista = await UserPersonaDependiente.findAll();

            const response = await request(app).post(`/userPersonaDependiente/personaDependiente/${personaDependienteId}/addFamiliar`)
                .set('accessToken', token)
                .send({nombre: "jsaj",
                    apellidos: "sncjgwh",
                    telefono: "128371289",
                    rol: "FAMILIAR",
                    username: "jbcah"})
            const lista2 = await UserPersonaDependiente.findAll();

            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal('There is no familiar with this data')
            expect(lista2.length).to.equal(lista.length)
        })

        it('Should not add a familiar to persona dependiente with an incorrect personaDependienteId', async () => {
            const personaDependienteId = 812786417468163986712972;

            const lista = await UserPersonaDependiente.findAll();

            const response = await request(app).post(`/userPersonaDependiente/personaDependiente/${personaDependienteId}/addFamiliar`)
                .set('accessToken', token)
                .send({nombre: "Familiar1",
                    apellidos: "Familiar1",
                    telefono: "129807564",
                    rol: "FAMILIAR",
                    username: "familiar1"})
            const lista2 = await UserPersonaDependiente.findAll();

            expect(response.statusCode).to.equal(200)
            expect(response.body.name).to.equal('SequelizeDatabaseError')
            expect(lista2.length).to.equal(lista.length)
        })

    })



})





after(done => {
    db.sequelize.close()
    done()
})
