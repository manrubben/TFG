const request = require('supertest')
const expect = require('chai').expect
const {app, db} = require('../index')
const { Users } = require("../models");
const bcrypt = require("bcryptjs");



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

    done()
})

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
