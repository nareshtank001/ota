import { BaseError } from "./BaseError";
import { QueryInterpolator } from "./QueryInterpolator";
import { QueryValidator } from "./QueryValidator";

export class Query {
    private constructor(private value: string) {}

    getValue(): string {
        return this.value;
    }

    static create(
        value: string,
        isSelectOnly: boolean,
        queryValidator: QueryValidator,
        interpolator: QueryInterpolator
    ): Query {
        if (value === "") {
            throw new BaseError("QUERY_ERROR", "SQL should not be blank");
        }

        if (this.isInterpolationNeeded(value)) {
            value = interpolator.interpolate(value);
        }

        if (!queryValidator.isValid(value) || (isSelectOnly && !queryValidator.isValidSelectQuery(value))) {
            throw new BaseError("QUERY_ERROR", "Invalid SQL query");
        }

        return new Query(value);
    }

    static isInterpolationNeeded(query: string): boolean {
        return /\{\{(\w+)\}\}/.test(query);
    }
}
