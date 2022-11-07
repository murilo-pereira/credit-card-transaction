import 'reflect-metadata'
import { JsonController, Post, Body } from 'routing-controllers'
import { TransactionDto } from "../../libraries/dto/TransactionDto"
import { TransactionService } from "../../services/TransactionService"
import { AccountService } from "../../services/AccountService"
import { MccCategoryService } from "../../services/MccCategoryService"
import { AccountRepository } from "../../repositories/AccountRepository"


@JsonController('/transaction')
export class TransactionController {
    private transactionService: TransactionService

    constructor() {
        this.transactionService = new TransactionService(
            new MccCategoryService(),
            new AccountService(new AccountRepository())
        )
    }

    @Post()
    async transaction(@Body({ validate: true }) transaction: TransactionDto) {
        return this.transactionService.transactionAuthorize(transaction)
    }
}