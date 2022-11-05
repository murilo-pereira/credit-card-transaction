export class DefaultResponse {
    private code: string

    constructor(code?: string) {
        if(code) {
            this._code = code
        }
    }

    get _code(): string {
        return this.code;
    }

    set _code(value: string) {
        this.code = value;
    }
}