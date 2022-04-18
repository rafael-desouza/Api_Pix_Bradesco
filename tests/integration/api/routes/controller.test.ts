import request from 'supertest'

import { startServer, closeServer, server } from 'tests/helpers/server'

describe('/Health-check', () => {
  beforeAll(startServer)

  it('should return status code 204', async () => {
    await request(server).get('/health-check').expect(204)
  })

  afterAll(closeServer)
})
