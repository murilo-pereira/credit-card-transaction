import 'reflect-metadata'
import { JsonController, Post, Body } from 'routing-controllers'
import { AccountService } from "../../services/AccountService"
import { AccountRepository } from "../../repositories/AccountRepository"
import { AccountDto } from "../../libraries/dto/AccountDto"

@JsonController('/account')
export class AccountController {
    private accountService: AccountService

    constructor() {
        this.accountService = new AccountService(
            new AccountRepository()
        )
    }

    @Post()
    async saveAccount(@Body({ validate: true }) account: AccountDto) {
        return this.accountService.saveAccount(account)
    }
}