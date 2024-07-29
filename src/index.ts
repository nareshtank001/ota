import { JobExecuter } from "./JobExecuter";
import { JobFetcher } from "./JobFetcher";
import { RemoteDataService } from "./RemoteDataService";

const FEATCH_INTERVAL_IN_SECONDS = 2;
const REMOTE_SERVER_URL = "http://localhost:3000";

const executer = new JobExecuter();

const remoteDataService = new RemoteDataService(REMOTE_SERVER_URL);

const fetcher = new JobFetcher(executer, remoteDataService, FEATCH_INTERVAL_IN_SECONDS);

fetcher.start();
