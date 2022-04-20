import axios, { AxiosError } from 'axios'
import fs from 'fs'
import qs from 'qs'
import path from 'path'
import https from 'https'

import { BRADESCO_CERT, BRADESCO_ENDPOINT } from '~/config/env'
import { BradescoRetorno, ClientInfo } from '~/classes/types'
import { BradescoCobrancaRequest, GetCobrançasQuery } from './request'
import { logger } from '~/common/logger'
import { RequisitionFailedError, ValidationError } from '~/classes/error'

export const getAgent = () => {
  if (!BRADESCO_CERT) throw new Error('Certificate not found')

  const certPath = path.join(__dirname, '..', '..', '..', '..', 'certs', BRADESCO_CERT)
  const cert = fs.readFileSync(certPath)
  const agent = new https.Agent({ pfx: cert, passphrase: '1234' })

  return agent
}

export const createCharge = async (token: string, payload: BradescoCobrancaRequest): Promise<BradescoRetorno> => {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://qrpix-h.bradesco.com.br/v2/cob-emv`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      httpsAgent: getAgent(),
      data: payload
    })

    return response.data
  } catch (error) {
    const errorResponse = error as AxiosError

    if (errorResponse.response?.status === 401)
      throw new ValidationError(errorResponse.response?.data.error_description, errorResponse.response?.status)

    throw new RequisitionFailedError(errorResponse.response?.data.detail, errorResponse.response?.status)
  }
}

export const authenticateTokenBradesco = async ({ clientID, clientSecret }: ClientInfo) => {
  const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')

  try {
    const response = await axios({
      method: 'POST',
      url: `${BRADESCO_ENDPOINT}/oauth/token`,
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      httpsAgent: getAgent(),
      data: qs.stringify({
        grant_type: 'client_credentials'
      })
    })

    logger.info('Created token successfully')
    return response.data
  } catch (error) {
    const errorResponse = error as AxiosError

    throw new ValidationError(errorResponse.response?.data.error_description, errorResponse.response?.status)
  }
}

export const findOne = async (token: string, identifier: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BRADESCO_ENDPOINT}/v2/cob/${identifier}`,
      headers: {
        Authorization: token
      },
      httpsAgent: getAgent()
    })

    logger.info(`Found one charge with identifier ${identifier}`)
    return response.data
  } catch (error) {
    const errorResponse = error as AxiosError

    if (errorResponse.response?.status === 401)
      throw new ValidationError(errorResponse.response?.data.error_description, errorResponse.response?.status)

    throw new RequisitionFailedError(errorResponse.response?.data.detail, errorResponse.response?.status)
  }
}

export const findMany = async (token: string, queryParams: GetCobrançasQuery) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BRADESCO_ENDPOINT}/v2/cob`,
      headers: {
        Authorization: token
      },
      params: { inicio: queryParams.inicio, fim: queryParams.fim },
      httpsAgent: getAgent()
    })

    logger.info('Found  charges')
    return response.data
  } catch (error) {
    const errorResponse = error as AxiosError

    if (errorResponse.response?.status === 401)
      throw new ValidationError(errorResponse.response?.data.error_description, errorResponse.response?.status)

    throw new RequisitionFailedError(errorResponse.response?.data.detail, errorResponse.response?.status)
  }
}
