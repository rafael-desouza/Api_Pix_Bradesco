import axios from 'axios'
import fs from 'fs'
import qs from 'qs'
import path from 'path'
import https from 'https'

import { BRADESCO_CERT, BRADESCO_ENDPOINT } from '~/config/env'
import { ClientCredentials } from '~/types/credentials'

const certPath = path.join(__dirname, '..', '..', '..', 'certs', BRADESCO_CERT)

const cert = fs.readFileSync(certPath)

const agent = new https.Agent({ pfx: cert, passphrase: '1234' })

export const authenticate = async (clientCredentials: ClientCredentials) => {
  const credentials = Buffer.from(`${clientCredentials.clientID}:${clientCredentials.clientSecret}`).toString('base64')

  try {
    return await axios({
      method: 'POST',
      url: `${BRADESCO_ENDPOINT}/oauth/token`,
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      httpsAgent: agent,
      data: qs.stringify({
        grant_type: 'client_credentials'
      })
    })
  } catch (error) {
    //! TODO: Create better error handling
    console.log(error)
    throw error
  }
}
