import { Document } from 'mongodb'
import { TransactionDto } from "../libraries/dto/TransactionDto"
import { MccCategoryService } from "./MccCategoryService"
import { AccountService } from "./AccountService"
import { DefaultResponse } from "../libraries/bodyData/responses/DefaultResponse"
import { Transaction } from "../domain/responseCode/Transaction"

export class TransactionService {
    private mccCategoryService: MccCategoryService

    private accountService: AccountService

    constructor(
        mccCategoryService: MccCategoryService,
        accountService: AccountService,
    ) {
        this.mccCategoryService = mccCategoryService

        this.accountService = accountService
    }

    public async transactionAuthorize(transaction: TransactionDto): Promise<DefaultResponse> {
        const account = await this.accountService.getAccountById(transaction.account)

        if(!account){
            return new DefaultResponse(Transaction.REJECTED)
        }

        const category = this.getTransactionCategory(transaction)

        if(!category){
            return this.authorizeWithCash(transaction, account)
        }

        const categoryAmount = account.benefitAmounts[category]

        if(transaction.totalAmount > categoryAmount){
            return this.authorizeWithFallback(transaction, category, categoryAmount, account)
        }

        const newCategoryAmount = categoryAmount - transaction.totalAmount

        const update = await this.accountService.updateBenefitAmount(transaction.account, category, newCategoryAmount)

        if(update.acknowledged){
            return new DefaultResponse(Transaction.APPROVED)
        }

        return new DefaultResponse(Transaction.REJECTED)
    }

    private getTransactionCategory(transaction: TransactionDto): string | undefined {
        const category = this.mccCategoryService.getCategoryLowerCaseByMcc(transaction.mcc)

        if(category){
            return category
        }

        return this.mccCategoryService.getCategoryLowerCaseByMerchant(transaction.merchant.substring(0, 25))
    }

    private async authorizeWithCash(transaction: TransactionDto, account: Document): Promise<DefaultResponse> {
        if(transaction.totalAmount > account.cash){
            return new DefaultResponse(Transaction.REJECTED_BALANCE)
        }

        const newCashAmount = account.cash - transaction.totalAmount

        const update = await this.accountService.updateCash(transaction.account, newCashAmount)

        if(update.acknowledged){
            return new DefaultResponse(Transaction.APPROVED)
        }

        return new DefaultResponse(Transaction.REJECTED)
    }

    private async authorizeWithFallback(
        transaction: TransactionDto,
        category: string,
        categoryAmount: number,
        account: Document
    ): Promise<DefaultResponse> {
        const missingAmount = transaction.totalAmount - categoryAmount

        if(missingAmount > account.cash){
            return new DefaultResponse(Transaction.REJECTED_BALANCE)
        }

        const newCashAmount = account.cash - missingAmount

        const update = await this.accountService.updateBenefitAmountAndCash(transaction.account, category, 0, newCashAmount)

        if(update.acknowledged){
            return new DefaultResponse(Transaction.APPROVED)
        }

        return new DefaultResponse(Transaction.REJECTED)
    }
}