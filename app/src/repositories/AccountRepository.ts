import { BaseRepository } from "./BaseRepository"
import { AccountDto } from "../libraries/dto/AccountDto"

export class AccountRepository extends BaseRepository {
    protected getCollectionName(): string {
        return 'accounts'
    }

    public async saveAccount(account: AccountDto): Promise<boolean> {
        const mongoDb = await this.getDb()

        const save = await mongoDb.collection(this.getCollectionName()).insertOne(account)

        return save.acknowledged
    }

    public async getAccountById(id: number) {
        const mongoDb = await this.getDb()

        return mongoDb.collection(this.getCollectionName()).findOne({accountId: id})
    }

    public async getAccountByIdOrCpf(id: number, cpf: string) {
        const mongoDb = await this.getDb()

        return mongoDb.collection(this.getCollectionName()).find({
            $or:[
                { accountId: id },
                { cpf: cpf }
            ]}
        ).toArray()
    }

    public async updateBenefitAmount(accountId: number, category: string, amount: number) {
        const mongoDb = await this.getDb()

        return mongoDb.collection(this.getCollectionName()).updateOne({
            accountId: accountId
        }, {
            $set: {
                [`benefitAmounts.${category}`]: amount
            }
        })
    }

    public async updateBenefitAmountAndCash(accountId: number, category: string, categoryAmount: number, cash: number) {
        const mongoDb = await this.getDb()

        return mongoDb.collection(this.getCollectionName()).updateOne({
            accountId: accountId
        }, {
            $set: {
                [`benefitAmounts.${category}`]: categoryAmount,
                cash: cash
            }
        })
    }

    public async updateCash(accountId: number, cash: number) {
        const mongoDb = await this.getDb()

        return mongoDb.collection(this.getCollectionName()).updateOne({
            accountId: accountId
        }, {
            $set: {
                cash: cash
            }
        })
    }
}