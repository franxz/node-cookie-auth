export class BadRequest extends Error {
    constructor (message = 'Bad Request') {
        super(message);
        this.status = 400;
    }
}

export class Unauthorized extends Error {
    constructor (message = 'Unauthorized') {
        super(message);
        this.status = 401;
    }
}

export class Forbidden extends Error {
    constructor (message = 'Forbidden') {
        super(message);
        this.status = 403;
    }
}