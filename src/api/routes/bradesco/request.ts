import { IsDate, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator'

export class Calendario {
  @IsNotEmpty()
  @IsNumber()
  expiracao: number
}

export class Devedor {
  @IsString()
  @IsOptional()
  cnpj?: string

  @IsString()
  @IsOptional()
  cpf?: string

  @IsString()
  @IsNotEmpty()
  nome: string
}

export class Valor {
  @IsNotEmpty()
  @IsNumberString()
  original: string
}

export class GetCobrançasQuery {
  @IsDate()
  @IsNotEmpty()
  inicio: Date

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  fim?: Date
}

export class BradescoCobrancaRequest {
  @IsOptional()
  @ValidateNested()
  calendario: Calendario

  @IsOptional()
  @ValidateNested()
  devedor: Devedor

  @IsNotEmpty()
  @IsString()
  chave: string

  @IsNotEmpty()
  @ValidateNested()
  valor: Valor

  @IsOptional()
  @IsString()
  solicitacaoPagador: string
}
