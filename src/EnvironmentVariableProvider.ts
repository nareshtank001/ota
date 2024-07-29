export class EnvironmentVariableProvider {
    get(key: string): string | undefined {
        return process.env[key];
    }
}
