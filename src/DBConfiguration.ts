export type DBConfiguration = {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    connectionTimeoutMillis?: number;
};
