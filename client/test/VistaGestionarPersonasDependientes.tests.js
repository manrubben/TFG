const expect = require('chai').expect
const BASEURL = "http://localhost:3000";

before(async () => {
    await browser.url(BASEURL + '/login')
    const username = await $('//input[@type=\'text\']')
    await username.setValue('coordinador1')
    const password = await $('//input[@type=\'password\']')
    await password.setValue('coordinador1')
    await $('button*=Login').click()
    await $('a*=Gestionar personas dependientes').click();
})

describe('GestionarPersonasDependientes page', () => {

    it('Should show the GestionarPersonasDependientes title', async () => {
        const titulo = await $('h1').getText();
        expect(titulo).to.equal('GESTIONAR PERSONAS DEPENDIENTES')
    })

    it('Should not show a random title', async () => {
        const titulo = await $('h1').getText();
        expect(titulo).not.to.equal('A random title')
    })

    it('Should go to CreatePersonaDependiente page', async () => {
        const createButton = await $('button*=Añadir persona dependiente')
        await createButton.click()
        const titulo = await $('h1').getText();
        expect(titulo).not.to.equal('GESTIONAR PERSONAS DEPENDIENTES')
        expect(titulo).to.equal('Añadir persona dependiente')
    })

    it('Should create a persona dependiente', async () => {

        const nombre = await $('[name="nombre"]')
        const apellidos = await $('[name="apellidos"]')
        const enfermedad = await $('[name="enfermedad"]')
        const gradoDeDependencia = await $('[name="gradoDeDependencia"]')
        const pastillasDia = await $('[name="pastillasDia"]')
        const pastillasTarde = await $('[name="pastillasTarde"]')
        const pastillasNoche = await $('[name="pastillasNoche"]')

        await nombre.setValue('prueba')
        await apellidos.setValue('prueba')
        await enfermedad.setValue('prueba')
        await gradoDeDependencia.setValue('prueba')
        await pastillasDia.setValue('prueba')
        await pastillasTarde.setValue('prueba')
        await pastillasNoche.setValue('prueba')

        const submitButton = await $('//button[@type=\'submit\']')
        await submitButton.click();

        await browser.waitUntil(async () => (await $('h1').getText()) === 'GESTIONAR PERSONAS DEPENDIENTES')

        const titulo = await $('h1').getText();
        const personaPost = await $('div*=prueba prueba')
        const isDisplayed = await personaPost.isDisplayed()
        expect(titulo).to.equal('GESTIONAR PERSONAS DEPENDIENTES')
        expect(isDisplayed).to.equal(true);
    })

    it('Should go to ShowPersonaDependiente page', async () => {
        const personaPost = await $('div*=prueba prueba')
        await personaPost.click()

        await browser.waitUntil(async () => (await $('h1').getText()) === 'Detalles de prueba prueba')

        const titulo = await $('h1').getText();
        expect(titulo).not.to.equal('GESTIONAR PERSONAS DEPENDIENTES')
        expect(titulo).to.equal('Detalles de')
    })

    it('Should go to EditPersonaDependiente page', async () => {
        const editButton = await $('button*=Editar');
        await editButton.click();
        const titulo = await $('h1').getText();
        expect(titulo).not.to.equal('Detalles de')
        expect(titulo).to.equal('EDITAR PERSONA DEPENDIENTE')
    })

    it('Should edit a persona dependiente', async () => {
        const nombre = await $('[name="nombre"]')
        await nombre.setValue('prueba')
        const submitButton = await $('//button[@type=\'submit\']')
        await submitButton.click();

        await browser.waitUntil(async () => (await $('h1').getText()) === 'Detalles de')

        const titulo = await $('h1').getText();
        expect(titulo).to.equal('Detalles de')
    })

})
