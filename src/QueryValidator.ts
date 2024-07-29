export interface QueryValidator {
    isValid(query: string): boolean;
    isValidSelectQuery(query: string): boolean;
}
