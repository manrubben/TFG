const request = require('supertest')
const app = require('../index')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVqZW1wbG8xIiwiaWQiOjEsInJvbCI6IkFETUlOIiwiaWF0IjoxNjQ4MDQ5MjY3fQ.nVXb4qnbjSpIhknizI0tlfwyyz1S0chLNw93wbwmFjI'

describe('GET PersonasDependientes', () => {
    test('should respond with a 200 status code', async() => {
        const response = await request(app).get('/personasDependientes').set('accessToken', token).send()
        console.log(response)
        expect(response.statusCode).toBe(200)
    })
})
