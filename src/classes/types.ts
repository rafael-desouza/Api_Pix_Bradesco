export type ClientCredentials = {
  clientID: string
  clientSecret: string
}

export type PrimitiveType = string | number | boolean | null

export interface ClientInfo {
  clientID: string
  clientSecret: string
}

export interface BancoInfo {
  token: string
  date: Date
  chavePix: string
}

/**
 * Object to send to Bradesco API
 */
export interface CobrancaInfo {
  calendario?: Calendario
  devedor?: Devedor
  valor: Valor
  chave: string
  solicitacaoPagador?: string
}

export interface Calendario {
  criacao?: Date
  expiracao: number
}

export interface Devedor {
  nome: string
  cpf?: string
  cnpj?: string
}

export interface Valor {
  original: string
  modalidadeAlteracao?: number
}

/**
 * Object returned from Bradesco API
 */
export interface BradescoRetorno {
  txid: string
  location: string
  revisao: number
  calendario: Calendario
  status: string
  devedor: Devedor
  valor: Valor
  chave: string
  solicitacaoPagador: string
  loc: LOC
  pixCopiaECola: string
}

export interface LOC {
  id: number
  location: string
  tipoCob: string
  criacao: Date
}
