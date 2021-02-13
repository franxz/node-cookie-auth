import bcryptjs from "bcryptjs";

const { compare } = bcryptjs;


export const matchesPassword = (password, storedPassword) => compare(password, storedPassword);