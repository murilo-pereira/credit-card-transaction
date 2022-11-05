import { Db } from "mongodb"
import { MongoClient } from "../libraries/database/MongoClient"

export abstract class BaseRepository {
    protected async getDb(): Promise<Db> {
        return MongoClient.getDb()
    }

    protected abstract getCollectionName(): string
}