import { auth } from "../../../../lib/auth";  // TODO : use absolute path once import alias is fixed
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);