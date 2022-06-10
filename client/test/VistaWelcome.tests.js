const expect = require('chai').expect
const BASEURL = "http://localhost:3000";

describe('Welcome page', () => {

    it('Should show the welcome title', async () => {
        await browser.url(BASEURL);
        const titulo = await $('h1').getText()
        expect(titulo).to.equal('This is the welcome page')
        //await browser.end;
    })

    it('Should not show a random title', async () => {
        await browser.url(BASEURL);
        const titulo = await $('h1').getText()
        expect(titulo).not.to.equal('A random title')
        //await browser.end;
    })

    it('Should go to the login page', async () => {
        await browser.url(BASEURL);
        const linkLogin = await $('a*=Login')
        await linkLogin.click()
        const textoBotonLogin = await $('button').getText();
        expect(textoBotonLogin).to.equal('Login')
        await browser.end;
    })
})

