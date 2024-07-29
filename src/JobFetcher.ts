import { BaseError } from "./BaseError";
import { JobExecuter } from "./JobExecuter";
import { RemoteDataService } from "./RemoteDataService";

export class JobFetcher {
    constructor(
        private jobExecuter: JobExecuter,
        private remoteDataService: RemoteDataService,
        private interval: number
    ) {}

    start(): void {
        setInterval(() => {
            this.fetch().catch((error) => {
                console.error(error.message);
            });
        }, 1000 * this.interval);
    }
    private async fetch(): Promise<void> {
        try {
            const job = await this.remoteDataService.getJob();
            if (job) {
                await this.jobExecuter.execute(job);
            }
        } catch (error) {
            if (error instanceof BaseError) {
                throw error;
            } else {
                throw new BaseError("JOB_FETCHER_ERROR", "Error on job fetch");
            }
        }
    }
}
