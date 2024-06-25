export class FieldRequiredError extends Error {
    constructor(message) {
        super(message);
        this.name = "FieldRequiredError";
        this.statusCode = 400;
    }
}
