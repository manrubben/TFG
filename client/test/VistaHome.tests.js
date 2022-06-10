const expect = require('chai').expect
const BASEURL = "http://localhost:3000";

before(async () => {
    await browser.url(BASEURL + '/login')
    const username = await $('//input[@type=\'text\']')
    await username.setValue('coordinador1')
    const password = await $('//input[@type=\'password\']')
    await password.setValue('coordinador1')
    await $('button*=Login').click()
})

describe('Home page', () => {

    it('Should show the home title', async () => {
        const titulo = await $('h1').getText()
        expect(titulo).to.equal('This is the main page')
    })

    it('Should not show a random title', async () => {
        const titulo = await $('h1').getText()
        expect(titulo).not.to.equal('A random title')
    })

    it('Should go to the GestionarPersonasDependientes page', async () => {
        const gestionarPersonasDependientesLink = await $('a*=Gestionar personas dependientes')
        await gestionarPersonasDependientesLink.click();
        const titulo = await $('h1').getText();
        expect(titulo).to.equal('GESTIONAR PERSONAS DEPENDIENTES')
    })

    it('Should go to the GestionarAuxiliares page', async () => {
        const gestionarAuxiliares = await $('a*=Gestionar auxiliares')
        await gestionarAuxiliares.click();
        const titulo = await $('h1').getText();
        expect(titulo).to.equal('GESTIONAR AUXILIARES')
    })

    it('Should go to the GestionarFamiliares page', async () => {
        const gestionarFamiliares = await $('a*=Gestionar familiares')
        await gestionarFamiliares.click();
        const titulo = await $('h1').getText();
        expect(titulo).to.equal('GESTIONAR FAMILIARES')
    })

    it('Should log out', async () => {
        const botonLogout = await $('button*=Logout')
        await botonLogout.click();
        const titulo = await $('h1').getText();
        expect(titulo).not.to.equal('This is the main page')
        expect(titulo).to.equal('This is the welcome page')
    })

})
