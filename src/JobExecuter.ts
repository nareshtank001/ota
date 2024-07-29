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

        const query: string = job.getSqlQuery().getValue();
        await database.executeQuery(query);

        const auditQuery = job.getAduitQueries()?.getValue();
        if (auditQuery) {
            await database.executeQuery(auditQuery);
        }

        console.log("Job Executed Successfully");
    }

    async runRestoreJob(job: Job): Promise<void> {
        const database: Database = job.getDatabase();
        await database.createBackup();
        console.log("Job Executed Successfully");
    }
}
