import { Query } from "./Query";
import { BaseError } from "./BaseError";
import { Database } from "./Database";
import { JobType } from "./JobType";
import { QueryInterpolator } from "./QueryInterpolator";
import { QueryValidator } from "./QueryValidator";

export interface JobProps {
    id: number;
    type: JobType;
    database: Database;
    sqlQuery: Query;
    backupFile?: string;
    auditQueries?: Query;
}

export class Job {
    private id: number;
    private type: JobType = JobType.ExecuteSQL;
    private database: Database;
    private sqlQuery: Query;
    private backupFile?: string;
    private auditQueries?: Query;

    private constructor(jobProps: JobProps) {
        this.id = jobProps.id;
        this.type = jobProps.type;
        this.sqlQuery = jobProps.sqlQuery;
        this.database = jobProps.database;
        this.backupFile = jobProps.backupFile;
        this.auditQueries = jobProps.auditQueries;
    }

    getId(): number {
        return this.id;
    }

    getType(): JobType {
        return this.type;
    }

    getDatabase(): Database {
        return this.database;
    }

    getSqlQuery(): Query {
        return this.sqlQuery;
    }
    getAduitQueries(): Query | undefined {
        return this.auditQueries;
    }

    static create(jobProps: JobProps): Job {
        if (!Job.isValidJobType(jobProps.type)) {
            throw new BaseError("JOB_ERROR", "Invalid Job Type");
        }

        return new Job(jobProps);
    }

    static isValidJobType(type: JobType): boolean {
        return type === JobType.Restore || type === JobType.ExecuteSQL;
    }
}
