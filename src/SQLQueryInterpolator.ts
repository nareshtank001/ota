import { EnvironmentVariableProvider } from "./EnvironmentVariableProvider";
import { QueryInterpolator } from "./QueryInterpolator";

export class SQLQueryInterpolator implements QueryInterpolator {
    private readonly provider: EnvironmentVariableProvider;

    constructor(provider: EnvironmentVariableProvider) {
        this.provider = provider;
    }

    interpolate(query: string): string {
        return query.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            const value = this.provider.get(key);
            if (value === undefined) {
                throw new Error(`Missing environment variable: ${key}`);
            }
            return value;
        });
    }
}
