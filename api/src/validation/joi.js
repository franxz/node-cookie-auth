import { BadRequest } from "../errors/index.js";

export const validate = async (schema, payload) => {
    try {
        await schema.validateAsync(payload, { abortEarly: false });
    } catch (err) {
        throw new BadRequest(err);
    }
}