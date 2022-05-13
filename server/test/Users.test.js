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

    bcrypt.hash("auxiliar2", 10).then((hash) => {
        Users.create({
            nombre: "Auxiliar2",
            apellidos: "Auxiliar2",
            telefono: 123456789,
            rol: "AUXILIAR",
            username: "auxiliar2",
            password: hash,
        });
    });

    bcrypt.hash("auxiliar3", 10).then((hash) => {
        Users.create({
            nombre: "Auxiliar3",
            apellidos: "Auxiliar3",
            telefono: 887766554,
            rol: "AUXILIAR",
            username: "auxiliar3",
            password: hash,
        });
    });

    bcrypt.hash("familiar1", 10).then((hash) => {
        Users.create({
            nombre: "Familiar1",
            apellidos: "Familiar1",
            telefono: 998782600,
            rol: "FAMILIAR",
            username: "familiar1",
            password: hash,
        });
    });

    bcrypt.hash("familiar2", 10).then((hash) => {
        Users.create({
            nombre: "Familiar2",
            apellidos: "Familiar2",
            telefono: "728637121",
            rol: "FAMILIAR",
            username: "familiar2",
            password: hash,
        });
    });

    bcrypt.hash("familiar3", 10).then((hash) => {
        Users.create({
            nombre: "Familiar3",
            apellidos: "Familiar3",
            telefono: "798998392",
            rol: "FAMILIAR",
            username: "familiar3",
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

    describe('Update auxiliar', () => {

        it('Should update an auxiliar', async () => {
            const data = {
                nombre: "Auxiliar2",
                apellidos: "Auxiliar2",
                telefono: 999999999,
                rol: "AUXILIAR",
                username: "auxiliar2"
            }

            const auxiliar = await Users.findOne({where: {nombre: "Auxiliar1", apellidos: "Auxiliar1", telefono: 123456789, rol: "AUXILIAR", username: "auxiliar1"}})
            const response = await request(app).put(`/users/auxiliares/edit/${auxiliar.id}`)
                .set('accessToken', token)
                .send(data)

            const auxiliarUpdated = await Users.findByPk(auxiliar.id)

            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
        })

        it('Should not update an auxiliar with empty values', async () => {
            const data = {
                nombre: "Auxiliar2",
                apellidos: "",
                telefono: 123456789,
                rol: "AUXILIAR",
                username: ""
            }

            const auxiliar = await Users.findOne({where: {nombre: "Auxiliar2", apellidos: "Auxiliar2", telefono: 123456789, rol: "AUXILIAR", username: "auxiliar2"}})
            const response = await request(app).put(`/users/auxiliares/edit/${auxiliar.id}`)
                .set('accessToken', token)
                .send(data)

            expect(response.statusCode).to.equal(200)
            expect(response.body.name).to.equal('SequelizeValidationError')
        })

        it('Should not update an auxiliar with an incorrect id', async () => {
            const data = {
                nombre: "Auxiliar3",
                apellidos: "Auxiliar3",
                telefono: 999998888,
                rol: "AUXILIAR",
                username: "auxiliar3"
            }

            const auxiliarId = 9999778728172816281
            const response = await request(app).put(`/users/auxiliares/edit/${auxiliarId}`)
                .set('accessToken', token)
                .send(data)

            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal('There is no auxiliar with this id')
        })

    })

    describe('Delete auxiliar', () => {

        it('Should delete an auxiliar', async () => {
            const auxiliar = await Users.findOne({
                nombre: "Auxiliar3",
                apellidos: "Auxiliar3",
                telefono: 887766554,
                rol: "AUXILIAR",
                username: "auxiliar3",
            })

            const lista = await Users.findAll()
            const response = await request(app).del(`/users/auxiliares/delete/${auxiliar.id}`).set('accessToken', token)
            const lista2 = await Users.findAll()
            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('DELETED SUCCESSFULLY')
            expect(lista2.length).to.equal(lista.length - 1)
        })

        it('Should not delete an auxiliar with an incorrect id', async () => {
            const auxiliarId = 128736718129182018309137
            const lista = await Users.findAll()
            const response = await request(app).del(`/users/auxiliares/delete/${auxiliarId}`).set('accessToken', token)
            const lista2 = await Users.findAll()
            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal('There is no auxiliar with this id')
            expect(lista2.length).to.equal(lista.length)
        })

    })

    describe("Show familiar", () => {
        it("Should show a familiar", async () => {
            const familiar = await Users.findOne({where: {nombre: "Familiar1", apellidos: "Familiar1", telefono: 998782600, rol: "FAMILIAR", username: "familiar1",}})
            const response = await request(app).get(`/users/familiares/show/${familiar.id}`).set('accessToken', token)
            expect(response.statusCode).to.equal(200)
            expect(response.body.nombre).to.equal(familiar.nombre)
            expect(response.body.apellidos).to.equal(familiar.apellidos)
        })

        it("Should not show a familiar with a no familiar id", async () => {
            const familiar = await Users.findOne({where: {nombre: "Coordinador1", apellidos: "Coordinador1", telefono: 123456789, rol: "COORDINADOR", username: "coordinador1",}})
            const response = await request(app).get(`/users/familiares/show/${familiar.id}`).set('accessToken', token)
            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal("There is no familiar with this id")
        })

        it("Should not show a familiar with a non-existing id", async() => {
            const familiarId = 2917381098129728178126736
            const response = await request(app).get(`/users/familiares/show/${familiarId}`).set('accessToken', token)
            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal("There is no familiar with this id")
        })
    })

    describe("Update familiar", () => {
        it("Should update a familiar", async () => {
            const data = {
                nombre: "Familiar10",
                apellidos: "Familiar10",
                telefono: "28781391",
                rol: "FAMILIAR",
                username: "familiar10",
            }

            const familiar = await Users.findOne({where: {nombre: "Familiar1", apellidos: "Familiar1", telefono: 998782600, rol: "FAMILIAR", username: "familiar1",}})
            const response = await request(app).put(`/users/familiares/edit/${familiar.id}`)
                .set('accessToken', token)
                .send(data)

            const familiarUpdated = await Users.findByPk(familiar.id)

            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal("SUCCESS")
            expect(data.nombre).to.equal(familiarUpdated.nombre)
            expect(data.apellidos).to.equal(familiarUpdated.apellidos)
            expect(data.telefono).to.equal(familiarUpdated.telefono)
        })

        it("Should not update a familiar with empty values", async () => {
            const data = {
                nombre: "",
                apellidos: "",
                telefono: "2821911111",
                rol: "FAMILIAR",
                username: "familiar11",
            }

            const familiar = await Users.findOne({where: {nombre: "Familiar2", apellidos: "Familiar2", telefono: "728637121", rol: "FAMILIAR", username: "familiar2",}})
            const response = await request(app).put(`/users/familiares/edit/${familiar.id}`)
                .set('accessToken', token)
                .send(data)

            const familiarUpdated = await Users.findByPk(familiar.id)

            expect(response.statusCode).to.equal(200)
            expect(response.body.name).to.equal('SequelizeValidationError')
            expect(familiar.nombre).to.equal(familiarUpdated.nombre)
            expect(familiar.apellidos).to.equal(familiarUpdated.apellidos)
            expect(familiar.telefono).to.equal(familiarUpdated.telefono)
            expect(familiar.username).to.equal(familiarUpdated.username)
        })

        it("Should not update a familiar with an incorrect id", async () => {
            const data = {
                nombre: "Familiar10",
                apellidos: "Familiar10",
                telefono: "28781391",
                rol: "FAMILIAR",
                username: "familiar10",
            }

            const familiarId = 1873891273281282792172
            const response = await request(app).put(`/users/familiares/edit/${familiarId}`)
                .set('accessToken', token)
                .send(data)

            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal('There is no familiar with this id')
        })
    })

    describe("Delete familiar", () => {
        it("Should delete a familiar", async () => {
            const listaFamiliares = await Users.findAll({where: {rol: "FAMILIAR"}})
            const familiar = await Users.findOne({where: {nombre: "Familiar3", apellidos: "Familiar3", telefono: "798998392", rol: "FAMILIAR", username: "familiar3",}})
            const response = await request(app).del(`/users/familiares/delete/${familiar.id}`).set('accessToken', token)
            const listaFamiliaresUpdated = await Users.findAll({where: {rol: "FAMILIAR"}})
            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal("DELETED SUCCESSFULLY")
            expect(listaFamiliaresUpdated.length).to.equal(listaFamiliares.length-1)
        })

        it("Should not delete a familiar with a no familiar id", async () => {
            const listaFamiliares = await Users.findAll({where: {rol: "FAMILIAR"}})
            const familiar = await Users.findOne({where: {nombre: "Coordinador1", apellidos: "Coordinador1", telefono: 123456789, rol: "COORDINADOR", username: "coordinador1",}})
            const response = await request(app).del(`/users/familiares/delete/${familiar.id}`).set('accessToken', token)
            const listaFamiliaresUpdated = await Users.findAll({where: {rol: "FAMILIAR"}})
            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal("There is no familiar with this id")
            expect(listaFamiliaresUpdated.length).to.equal(listaFamiliares.length)
        })

        it("Should not delete a familiar with an incorrect id", async () => {
            const listaFamiliares = await Users.findAll({where: {rol: "FAMILIAR"}})
            const familiarId = 12873817389712272817
            const response = await request(app).del(`/users/familiares/delete/${familiarId}`).set('accessToken', token)
            const listaFamiliaresUpdated = await Users.findAll({where: {rol: "FAMILIAR"}})
            expect(response.statusCode).to.equal(200)
            expect(response.body.error).to.equal("There is no familiar with this id")
            expect(listaFamiliaresUpdated.length).to.equal(listaFamiliares.length)
        })
    })


})


after(done => {
    db.sequelize.close()
    done()
})
