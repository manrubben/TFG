const request = require('supertest')
const expect = require('chai').expect
const {app, db} = require('../index')
const { RegistrosDiarios, PersonasDependientes, Users, AuxiliaresRegistros, NotificacionMedicacion } = require("../models");
const bcrypt = require("bcryptjs");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvb3JkaW5hZG9yMSIsImlkIjo3LCJyb2wiOiJDT09SRElOQURPUiIsImlhdCI6MTY1MTk0MDc2OH0.XVFF_BlAOCfFBRysNyvrGJ47RgGvpIa0B30VRBp78w8'

before( (done) => {

    RegistrosDiarios.destroy({
        where: {}
    })

    NotificacionMedicacion.destroy({
        where: {}
    })

    PersonasDependientes.destroy({
        where:{}
    })

    PersonasDependientes.create({
        nombre: "Antonio",
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
        nombre: "Juan",
        apellidos: "García",
        enfermedad: "Parkinson",
        gradoDeDependencia: "60%",
        pastillasDia: "paracetamol",
        pastillasTarde: "aspirina",
        pastillasNoche: "paracetamol"
    })

    PersonasDependientes.create({
        nombre: "Juana",
        apellidos: "García",
        enfermedad: "Parkinson",
        gradoDeDependencia: "60%",
        pastillasDia: "paracetamol",
        pastillasTarde: "aspirina",
        pastillasNoche: "paracetamol"
    })

    PersonasDependientes.create({
        nombre: "Alba",
        apellidos: "García",
        enfermedad: "Parkinson",
        gradoDeDependencia: "60%",
        pastillasDia: "paracetamol",
        pastillasTarde: "aspirina",
        pastillasNoche: "paracetamol"
    })

    done()

})

describe('Notificacion medicacion', () => {

    describe('Create/update notificacion', () => {
        it('should create a notificacion', async () => {

            const hoy = new Date(Date.now());

            const personaDependiente = await PersonasDependientes.findOne(
                {
                    where:
                        {
                            nombre: "Manolo",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol",
                        }
                })


            const response = await request(app).get(`/notificaciones/createNotificacionMedicacion/${personaDependiente.id}`).set('accessToken', token)


            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')


        })

        it('should update a notificacion', async () => {

            const hoy = new Date(Date.now());
            const fecha = hoy.toLocaleDateString()

            const personaDependiente = await PersonasDependientes.findOne(
                {
                    where:
                        {
                            nombre: "Manolo",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol",
                        }
                })

            await NotificacionMedicacion.create({
                fecha: fecha,
                dia: true,
                tarde: false,
                noche: false,
                PersonasDependienteId: personaDependiente.id,
            })


            const response = await request(app).get(`/notificaciones/createNotificacionMedicacion/${personaDependiente.id}`).set('accessToken', token)

            const notificacion = await NotificacionMedicacion.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id
                }
            })


            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
            expect(notificacion.dia).to.equal(false)


        })

    })

    describe('Update notificacion dia', () => {
        it('should update a notificacion dia and create regisro', async () => {

            const hoy = new Date(Date.now());
            const fecha = hoy.toLocaleDateString()

            const personaDependiente = await PersonasDependientes.findOne(
                {
                    where:
                        {
                            nombre: "Antonio",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol",
                        }
                })

            await NotificacionMedicacion.create({
                fecha: fecha,
                dia: false,
                tarde: false,
                noche: false,
                PersonasDependienteId: personaDependiente.id,
            })


            const response = await request(app).get(`/notificaciones/updateDia/${personaDependiente.id}`).set('accessToken', token)

            const notificacion = await NotificacionMedicacion.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id
                }
            })

            const registro = await RegistrosDiarios.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id,
                    fecha: fecha,
                }
            })


            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
            expect(notificacion.dia).to.equal(true)
            expect(registro.medicacionManana).to.equal(true)


        })

        it('should update a notificacion and update registro', async () => {

            const hoy = new Date(Date.now());
            const fecha = hoy.toLocaleDateString()

            const personaDependiente = await PersonasDependientes.findOne(
                {
                    where:
                        {
                            nombre: "Manolo",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol",
                        }
                })

            await RegistrosDiarios.create({
                fecha:fecha,
                desayuno: "Tostada",
                almuerzo: "Filetes a la plancha",
                merienda: "Fruta",
                cena: "Sopa",
                pasosDiarios: 500,
                actividadFisica: "Andar",
                horasSueno: 7.5,
                tiempoAireLibre: "tiempoAireLibre",
                relacionSocial: "relacionSocial",
                medicacionManana: false,
                medicacionTarde: false,
                medicacionNoche: false,
                mes: 5,
                PersonasDependienteId: personaDependiente.id
            })

            await NotificacionMedicacion.create({
                fecha: fecha,
                dia: true,
                tarde: false,
                noche: false,
                PersonasDependienteId: personaDependiente.id,
            })


            const response = await request(app).get(`/notificaciones/updateDia/${personaDependiente.id}`).set('accessToken', token)

            const notificacion = await NotificacionMedicacion.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id
                }
            })

            const registro = await RegistrosDiarios.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id,
                    fecha: fecha,
                }
            })




            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
            expect(notificacion.dia).to.equal(true)
            expect(registro.medicacionManana).to.equal(true)


        })

    })

    describe('Update notificacion tarde', () => {
        it('should update a notificacion tarde and create regisro', async () => {

            const hoy = new Date(Date.now());
            const fecha = hoy.toLocaleDateString()

            const personaDependiente = await PersonasDependientes.findOne(
                {
                    where:
                        {
                            nombre: "Juan",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol",
                        }
                })

            await NotificacionMedicacion.create({
                fecha: fecha,
                dia: false,
                tarde: false,
                noche: false,
                PersonasDependienteId: personaDependiente.id,
            })


            const response = await request(app).get(`/notificaciones/updateTarde/${personaDependiente.id}`).set('accessToken', token)

            const notificacion = await NotificacionMedicacion.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id
                }
            })

            const registro = await RegistrosDiarios.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id,
                    fecha: fecha,
                }
            })


            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
            expect(notificacion.tarde).to.equal(true)
            expect(registro.medicacionTarde).to.equal(true)
            expect(notificacion.dia).to.equal(false)
            expect(registro.medicacionManana).to.equal(false)


        })

        it('should update a notificacion tarde and update registro', async () => {

            const hoy = new Date(Date.now());
            const fecha = hoy.toLocaleDateString()

            const personaDependiente = await PersonasDependientes.findOne(
                {
                    where:
                        {
                            nombre: "Manolo",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol",
                        }
                })

            await RegistrosDiarios.create({
                fecha:fecha,
                desayuno: "Tostada",
                almuerzo: "Filetes a la plancha",
                merienda: "Fruta",
                cena: "Sopa",
                pasosDiarios: 500,
                actividadFisica: "Andar",
                horasSueno: 7.5,
                tiempoAireLibre: "tiempoAireLibre",
                relacionSocial: "relacionSocial",
                medicacionManana: false,
                medicacionTarde: false,
                medicacionNoche: false,
                mes: 5,
                PersonasDependienteId: personaDependiente.id
            })

            await NotificacionMedicacion.create({
                fecha: fecha,
                dia: true,
                tarde: false,
                noche: false,
                PersonasDependienteId: personaDependiente.id,
            })


            const response = await request(app).get(`/notificaciones/updateTarde/${personaDependiente.id}`).set('accessToken', token)

            const notificacion = await NotificacionMedicacion.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id
                }
            })

            const registro = await RegistrosDiarios.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id,
                    fecha: fecha,
                }
            })


            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
            expect(notificacion.tarde).to.equal(true)
            expect(registro.medicacionTarde).to.equal(true)


        })

    })


    describe('Update notificacion noche', () => {
        it('should update a notificacion noche and create regisro', async () => {

            const hoy = new Date(Date.now());
            const fecha = hoy.toLocaleDateString()

            const personaDependiente = await PersonasDependientes.findOne(
                {
                    where:
                        {
                            nombre: "Juana",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol",
                        }
                })

            await NotificacionMedicacion.create({
                fecha: fecha,
                dia: false,
                tarde: false,
                noche: false,
                PersonasDependienteId: personaDependiente.id,
            })


            const response = await request(app).get(`/notificaciones/updateNoche/${personaDependiente.id}`).set('accessToken', token)

            const notificacion = await NotificacionMedicacion.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id
                }
            })

            const registro = await RegistrosDiarios.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id,
                    fecha: fecha,
                }
            })


            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
            expect(notificacion.noche).to.equal(true)
            expect(registro.medicacionNoche).to.equal(true)
            expect(notificacion.dia).to.equal(false)
            expect(registro.medicacionManana).to.equal(false)


        })

        it('should update a notificacion noche and update registro', async () => {

            const hoy = new Date(Date.now());
            const fecha = hoy.toLocaleDateString()

            const personaDependiente = await PersonasDependientes.findOne(
                {
                    where:
                        {
                            nombre: "Manolo",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol",
                        }
                })

            await RegistrosDiarios.create({
                fecha:fecha,
                desayuno: "Tostada",
                almuerzo: "Filetes a la plancha",
                merienda: "Fruta",
                cena: "Sopa",
                pasosDiarios: 500,
                actividadFisica: "Andar",
                horasSueno: 7.5,
                tiempoAireLibre: "tiempoAireLibre",
                relacionSocial: "relacionSocial",
                medicacionManana: false,
                medicacionTarde: false,
                medicacionNoche: false,
                mes: 5,
                PersonasDependienteId: personaDependiente.id
            })

            await NotificacionMedicacion.create({
                fecha: fecha,
                dia: true,
                tarde: false,
                noche: false,
                PersonasDependienteId: personaDependiente.id,
            })


            const response = await request(app).get(`/notificaciones/updateNoche/${personaDependiente.id}`).set('accessToken', token)

            const notificacion = await NotificacionMedicacion.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id
                }
            })

            const registro = await RegistrosDiarios.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id,
                    fecha: fecha,
                }
            })


            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('SUCCESS')
            expect(notificacion.noche).to.equal(true)
            expect(registro.medicacionNoche).to.equal(true)


        })

    })


    describe('Show notificacion medicacion', () => {
        it('should show notificacion medicacion', async () => {

            const hoy = new Date(Date.now());
            const fecha = hoy.toLocaleDateString()

            const personaDependiente = await PersonasDependientes.findOne(
                {
                    where:
                        {
                            nombre: "Alba",
                            apellidos: "García",
                            enfermedad: "Parkinson",
                            gradoDeDependencia: "60%",
                            pastillasDia: "paracetamol",
                            pastillasTarde: "aspirina",
                            pastillasNoche: "paracetamol",
                        }
                })

            await NotificacionMedicacion.create({
                fecha: fecha,
                dia: false,
                tarde: false,
                noche: false,
                PersonasDependienteId: personaDependiente.id,
            })


            const response = await request(app).get(`/notificaciones/notificacionMedicacion/${personaDependiente.id}`).set('accessToken', token)

            const notificacion = await NotificacionMedicacion.findOne({
                where:{
                    PersonasDependienteId: personaDependiente.id
                }
            })


            expect(response.statusCode).to.equal(200)
            expect(response.body.fecha).to.equal(notificacion.fecha)
            expect(response.body.dia).to.equal(notificacion.dia)


        })

    })

})


after(done => {
    db.sequelize.close()
    done()
})
