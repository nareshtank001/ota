import axios, { AxiosError, AxiosResponse } from "axios";
import { Job } from "./Job";
import { BaseError } from "./BaseError";
import { JobFactory } from "./JobFactory";

interface ApiResponse extends AxiosResponse {
    data: {
        data: any;
        success: boolean;
    };
}

export class RemoteDataService {
    constructor(private remoteServerUrl: string) {}

    async getJob(): Promise<Job | null> {
        try {
            const response = await axios.get<ApiResponse>(this.remoteServerUrl + "/job");

            if (response.status !== 200) {
                throw new BaseError("REMOTE_SERVER_ERROR", "Get Job API failed", response);
            }

            if (!response.data.data || !Array.isArray(response.data.data) || response.data.data.length === 0) {
                return null;
            }

            return JobFactory.create(response.data.data[0]);
        } catch (error) {
            if (error instanceof BaseError) {
                throw error;
            } else if (error instanceof AxiosError) {
                throw new BaseError("REMOTE_SERVER_ERROR", "Get Job API failed", error);
            } else {
                throw new BaseError("REMOTE_SERVER_ERROR", "Remote Server failed", error);
            }
        }
    }

    async sendJobLog(): Promise<void> {}
}
