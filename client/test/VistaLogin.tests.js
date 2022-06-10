const expect = require('chai').expect
const BASEURL = "http://localhost:3000";

describe('Login page', () => {

    it('Should log in successfully', async () => {
        await browser.url(BASEURL + '/login');
        const username = await $('//input[@type=\'text\']')
        await username.setValue('coordinador1')
        const password = await $('//input[@type=\'password\']')
        await password.setValue('coordinador1')
        await $('button*=Login').click()
        const titulo = await $('h1').getText()
        expect(titulo).to.equal('This is the main page')
        await browser.end;
    })

    /*
    it('Should not log in', async () => {
        await browser.url(BASEURL + '/login');
        const username = await $('//input[@type=\'text\']')
        await username.setValue('')
        const password = await $('//input[@type=\'password\']')
        await password.setValue('')
        await $('button*=Login').click()
        expect($('button*=Login').isDisplayed())
        await browser.end;
    })
    */

})

