const request = require('supertest')
const expect = require('chai').expect
const {app, db} = require('../index')
const { Users } = require("../models");
const bcrypt = require("bcryptjs");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVqZW1wbG8xIiwiaWQiOjEsInJvbCI6IkFETUlOIiwiaWF0IjoxNjQ4MDQ5MjY3fQ.nVXb4qnbjSpIhknizI0tlfwyyz1S0chLNw93wbwmFjI'


before( (done) => {
     Users.destroy({
        where: {}
    })

    bcrypt.hash("coordinador1", 10).then((hash) => {
        Users.create({
            nombre: "Coordinador1",
            apellidos: "Coordinador1",
            telefono: 123456789,
            rol: "COORDINADOR",
            username: "coordinador1",
            password: hash,
        });
    });

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

describe('Users tests', () => {

    describe('Login', () => {

        it('Should log in the application', async () => {
            const response = await request(app).post('/users/login').send({
                username: "coordinador1",
                password: "coordinador1"
            })
            expect(response.statusCode).to.equal(200)
            expect(response.body).to.have.property('token')
        })

        it('Should not log in the application with an incorrect username', async () => {
            const response = await request(app).post('/users/login').send({
                username: "jkhkash",
                password: "coordinador1"
            })
            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal("User doesn't exist")
        })

        it('Should not log in the application with an incorrect password', async () => {
            const response = await request(app).post('/users/login').send({
                username: "coordinador1",
                password: "jdahjc"
            })
            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal("Wrong username and password combination")
        })

        it('Should not log in the application with an empty username and password', async () => {
            const response = await request(app).post('/users/login').send({
                username: "",
                password: ""
            })
            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal("User doesn't exist")
        })
    })

    describe('Show auxiliar', () => {

        it('Should show an auxiliar', async () => {
            const auxiliar = await Users.findOne({where: {nombre: "Auxiliar1", apellidos: "Auxiliar1", telefono: 123456789, rol: "AUXILIAR", username: "auxiliar1"}})
            const auxiliarId = auxiliar.id
            const response = await request(app).get(`/users/auxiliares/show/${auxiliarId}`).set('accessToken', token)

            expect(response.statusCode).to.equal(200)
            expect(response.body.nombre).to.equal(auxiliar.nombre)
            expect(response.body.apellidos).to.equal(auxiliar.apellidos)
        })

        it('Should not show an auxiliar with an incorrect id', async () => {
            const auxiliarId = 9999999999999999
            const response = await request(app).get(`/users/auxiliares/show/${auxiliarId}`).set('accessToken', token)

            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal('There is no user with this id')
        })

    })
})



