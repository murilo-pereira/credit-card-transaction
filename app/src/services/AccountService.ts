import { AccountDto } from "../libraries/dto/AccountDto"
import { AccountRepository } from "../repositories/AccountRepository"
import { DefaultResponse } from "../libraries/bodyData/responses/DefaultResponse"
import { Account } from "../domain/responseCode/Account"

export class AccountService {
    private accountRepository: AccountRepository

    constructor(accountRepository: AccountRepository) {
        this.accountRepository = accountRepository
    }

    public async saveAccount(account: AccountDto) {
        const accounts = await this.accountRepository.getAccountByIdOrCpf(account.accountId, account.cpf)

        if(accounts.length > 0) {
            return new DefaultResponse(Account.USER_ALREADY_REGISTERED)
        }

        const saveAccount = await this.accountRepository.saveAccount(account)

        if(saveAccount.acknowledged){
            return new DefaultResponse(Account.SUCCESS)
        }

        return new DefaultResponse(Account.SERVER_ERROR)
    }

    public async getAccountById(accountId: number) {
        return this.accountRepository.getAccountById(accountId)
    }

    public async updateBenefitAmount(accountId: number, category: string, amount: number){
        return this.accountRepository.updateBenefitAmount(accountId, category, amount)
    }

    public async updateBenefitAmountAndCash(accountId: number, category: string, categoryAmount: number, cash: number){
        return this.accountRepository.updateBenefitAmountAndCash(accountId, category, categoryAmount, cash)
    }

    public async updateCash(accountId: number, cash: number){
        return this.accountRepository.updateCash(accountId, cash)
    }
}