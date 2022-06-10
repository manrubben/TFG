//const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
//import { remote } from 'webdriverio'
/*
const expect = require('chai').expect
const BASEURL = "http://localhost:3000";

describe('Welcome page', () => {

    it('Welcome page', async () => {
        await browser.url(BASEURL);
        const titulo = await $('h1').getText()
        expect(titulo).to.equal('This is the welcome page')
        await browser.end;
    })


    it('Welcome page to login page', async () => {
        await browser.url(BASEURL);
        const linkLogin = await $('a*=Login')
        await linkLogin.click()
        const textoBotonLogin = await $('button').getText();
        expect(textoBotonLogin).to.equal('Login')
        await browser.end;
    })

    it('Login page', async () => {
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

    it('Login page negative', async () => {
        await browser.url(BASEURL + '/login');
        const username = await $('//input[@type=\'text\']')
        await username.setValue('')
        const password = await $('//input[@type=\'password\']')
        await password.setValue('')
        await $('button*=Login').click()
        expect($('button*=Login').isDisplayed())
        await browser.end;
    })
})

(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get(BASEURL);
        await driver.findElement(By.xpath('//div[@id=\'root\']/div/div/h1'))
        await driver.quit();
})();
 */

