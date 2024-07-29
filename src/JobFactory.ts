import { Database } from "./Database";
import { EnvironmentVariableProvider } from "./EnvironmentVariableProvider";
import { Job } from "./Job";
import { Query } from "./Query";
import { QueryInterpolator } from "./QueryInterpolator";
import { QueryValidator } from "./QueryValidator";
import { SQLQueryInterpolator } from "./SQLQueryInterpolator";
import { SQLQueryValidator } from "./SQLQueryValidator";

export class JobFactory {
    static create(jobData: any): Job {
        const { id, type, backupFile, dbConfig } = jobData;

        const queryValidator: QueryValidator = new SQLQueryValidator();
        const envProvider: EnvironmentVariableProvider = new EnvironmentVariableProvider();
        const interpolator: QueryInterpolator = new SQLQueryInterpolator(envProvider);

        const sqlQuery: Query = Query.create(jobData.sqlQuery, false, queryValidator, interpolator);

        let auditQueries;
        if (jobData.auditQueries) {
            auditQueries = Query.create(jobData.auditQueries, true, queryValidator, interpolator);
        }

        const database: Database = new Database(dbConfig);

        return Job.create({ id, type, database, sqlQuery, backupFile, auditQueries });
    }
}
