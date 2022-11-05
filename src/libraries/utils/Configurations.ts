export namespace Configurations {
    export function getEnvironment(): string {
        return process.env.NODE_ENV!
    }

    export function getServerPort(): string {
        return process.env.SERVER_PORT!
    }

    export function getMongoUri(): string {
        return process.env.MONGO_URI!
    }

    export function getMongoDatabase(): string {
        return process.env.MONGO_DATABASE!
    }
}