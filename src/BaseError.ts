export class BaseError extends Error {
    constructor(name: string, message: string, stack?: any) {
 this.name = name;
        this.stack = stack;
        super(message);
        this.name = name;
        this.stack = stack;
    }
}
