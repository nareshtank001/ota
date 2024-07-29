export class BaseError extends Error {
    constructor(name: string, message: string, stack?: any) {
        super(message);
        this.name = name;
        this.stack = stack;
    }
}
