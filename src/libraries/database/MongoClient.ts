import { MongoClient as Mongo, Db } from "mongodb"
import { Configurations } from "../utils/Configurations"

export class MongoClient {
    private static mongoDb: Db

     static async getDb(): Promise<Db> {
        if(MongoClient.mongoDb) {
            return MongoClient.mongoDb
        }

         const mongo = await new Mongo(Configurations.getMongoUri()).connect()

         MongoClient.mongoDb = mongo.db(Configurations.getMongoDatabase())

        return MongoClient.mongoDb
    }
}