
const request =  require('supertest')
const app = require('../../app')
describe('Test GET launches', () => {
    test('it should response wih 200 response', async()=>{
        const response =  await request(app).get('/nasaplanet/launches')
        expect(response.statusCode).toBe(200)
    })
})
describe('Test POST launches',()=>{
    test('it should response wih 200 success', ()=>{

    })
    test('it should catch missing required properties', ()=>{

    })
    test('it should catch invalid dates', ()=>{

    })
})