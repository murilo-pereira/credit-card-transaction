import { IsNotEmpty, IsNumber, IsObject, IsString, Length, IsNotEmptyObject, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class BenefitAmountsDto {
    @IsNotEmpty()
    @IsNumber()
    meal: number

    @IsNotEmpty()
    @IsNumber()
    food: number

    @IsNotEmpty()
    @IsNumber()
    culture: number
}

export class AccountDto {
    @IsNotEmpty()
    @IsNumber()
    accountId: number

    @IsNotEmpty()
    @IsString()
    @Length(11, 11)
    cpf: string

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => BenefitAmountsDto)
    benefitAmounts: BenefitAmountsDto

    @IsNotEmpty()
    @IsNumber()
    cash: number
}
