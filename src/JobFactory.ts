import { Database } from "./Database";
import { EnvironmentVariableProvider } from "./EnvironmentVariableProvider";
import { Job } from "./Job";
import { QueryInterpolator } from "./QueryInterpolator";
import { QueryValidator } from "./QueryValidator";
import { SqlQueryInterpolator } from "./SqlQueryInterpolator";
import { SQLQueryValidator } from "./SQLQueryValidator";

export class JobFactory {
    static create(jobData: any): Job {
        const { id, type, sqlQuery, backupFile, dbConfig } = jobData;
        const database: Database = new Database(dbConfig);
        const queryValidator: QueryValidator = new SQLQueryValidator();
        const envProvider: EnvironmentVariableProvider = new EnvironmentVariableProvider();
        const interpolator: QueryInterpolator = new SqlQueryInterpolator(envProvider);
        return Job.create({ id, type, database, sqlQuery, backupFile }, queryValidator, interpolator);
    }
}
