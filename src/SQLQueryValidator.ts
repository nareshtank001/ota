import { QueryValidator } from "./QueryValidator";
import { Parser } from "node-sql-parser";

export class SQLQueryValidator implements QueryValidator {
    isValid(query: string): boolean {
        const parser = new Parser();
        try {
            parser.parse(query);
            return true;
        } catch (error) {
            return false;
        }
    }

    isValidSelectQuery(query: string): boolean {
        const parser = new Parser();
        try {
            const whiteTableList = ["select::(.*)::(.*)"];
            parser.whiteListCheck(query, whiteTableList);
            return true;
        } catch (error) {
            return false;
        }
    }
}
