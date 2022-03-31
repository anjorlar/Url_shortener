process.env.NODE_ENV = 'test'

import expect from "expect";
import request from "supertest";
import { app } from "../app"

import { url, seedUrl } from "./seed"

beforeEach(async function () {
    const val = await seedUrl()
})

describe("URL", async () => {
    it("should create a short url", (done) => {
        const val = {
            longUrl: `https://www.google.com/`
        }
        request(app)
            .post(`/createUrlShortner`)
            .send(val)
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('urlCode')
                expect(res.body).toHaveProperty(`longUrl`)
                expect(res.body).toHaveProperty("shortUrl")
                expect(res.body).toHaveProperty("date")
                expect(res.body.longUrl).toMatch(val.longUrl)
            })
            .end(done)
    })

    it("should throw error where redirect to the long url", async () => {
        console.log(">> url[1]['shortUrl']", url[0]['shortUrl'])
        const res = await request(app)
            // .get(`/sCt8ShC`)
            .get(`/${url[0]['shortUrl']}`)
            .expect(404)
        // .expect(200)
    })
})