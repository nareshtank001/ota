import { Database } from "./Database";
import { Job } from "./Job";
import { JobType } from "./JobType";

export class JobExecuter {
    constructor() {}

    async execute(job: Job): Promise<void> {
        switch (job.getType()) {
            case JobType.ExecuteSQL:
                await this.runExecuteSQLJob(job);
                break;
            default:
                await this.runRestoreJob(job);
                break;
        }
    }

    async runExecuteSQLJob(job: Job): Promise<void> {
        const database: Database = job.getDatabase();
        await database.testConnection();
        const query = job.getSqlQuery();
        await database.executeQuery(query);
        console.log("Job Executed Successfully");
    }

    async runRestoreJob(job: Job): Promise<void> {
        const database: Database = job.getDatabase();
        await database.createBackup();
        console.log("Job Executed Successfully");
    }
}
