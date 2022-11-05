import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator'

export class TransactionDto {
    @IsNotEmpty()
    @IsNumber()
    account: number

    @IsNotEmpty()
    @IsNumber()
    totalAmount: number

    @IsNotEmpty()
    @IsString()
    @Length(4,4)
    mcc: string

    @IsNotEmpty()
    @IsString()
    @Length(40, 40)
    merchant: string
}