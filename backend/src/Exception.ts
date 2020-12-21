export default class Excepion extends Error {
    public error: string;
    public data?: unknown;

    constructor({ error, data }: { error: string, data?: unknown }) {
        super(error)
        this.error = error;
        this.data = data;
    }
}