import { BaseError } from "./BaseError";
import { DBConfiguration } from "./DBConfiguration";
import { Client } from "pg";

export class Database {
    private connectionTimeoutMillis: number = 2000;

    constructor(private dbConfig: DBConfiguration) {
        if (!dbConfig.connectionTimeoutMillis) {
            dbConfig.connectionTimeoutMillis = this.connectionTimeoutMillis;
        }
    }

    private async getConnection(): Promise<Client> {
        try {
            const client: Client = new Client(this.dbConfig);
            await client.connect();
            return client;
        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError("DATABASE_ERROR", error.message, error.stack);
            } else {
                throw new BaseError("DATABASE_ERROR", "Database Connection Failed", error);
            }
        }
    }

    async testConnection(): Promise<boolean> {
        try {
            const client: Client = await this.getConnection();
            client.end();
            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError("DATABASE_ERROR", error.message, error.stack);
            } else {
                throw new BaseError("DATABASE_ERROR", "Database Connection Failed", error);
            }
        }
    }

    async executeQuery(query: string): Promise<any> {
        const client: Client = await this.getConnection();
        try {
            const result = await client.query(query);
            return result;
        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError("DATABASE_ERROR", error.message, error.stack);
            } else {
                throw new BaseError("DATABASE_ERROR", "Database query execution failed", error);
            }
        } finally {
            client.end();
        }
    }

    async createBackup(): Promise<void> {}

    async rename(newName: string) {}
}
