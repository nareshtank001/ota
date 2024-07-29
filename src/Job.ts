import { BaseError } from "./BaseError";
import { Database } from "./Database";
import { JobType } from "./JobType";
import { QueryInterpolator } from "./QueryInterpolator";
import { QueryValidator } from "./QueryValidator";

export interface JobProps {
    id: number;
    type: JobType;
    database: Database;
    sqlQuery: string;
    backupFile?: string;
    auditQueries?: string;
}

export class Job {
    private id: number;
    private type: JobType = JobType.ExecuteSQL;
    private database: Database;
    private sqlQuery: string = "";
    private backupFile?: string;
    private auditQueries?: string;

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

    getSqlQuery(): string {
        return this.sqlQuery;
    }

    static create(jobProps: JobProps, queryValidator: QueryValidator, interpolator: QueryInterpolator): Job {
        if (!Job.isValidJobType(jobProps.type)) {
            throw new BaseError("JOB_ERROR", "Invalid Job Type");
        }

        if (!queryValidator.isValid(jobProps.sqlQuery)) {
            throw new BaseError("JOB_ERROR", "Invalid SQL query");
        }

        if (jobProps.sqlQuery !== "") {
            jobProps.sqlQuery = interpolator.interpolate(jobProps.sqlQuery);
        }

        return new Job(jobProps);
    }

    static isValidJobType(type: JobType): boolean {
        return type === JobType.Restore || type === JobType.ExecuteSQL;
    }
}
