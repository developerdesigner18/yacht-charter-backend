import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method

import * as passportService from "./passport.js"
import passport from "passport";

// Create the interceptor and ensure that the cookie is turned off
export const requireAuth = passport.authenticate("jwt", { session: false });
export const requireSignIn = passport.authenticate("local", { session: false });