import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { secret } from "@/config/secret";
import { UnauthorizedError } from "@/errors/HttpErrors";

const CSRF_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const CSRF_COOKIE_NAME = "CSRF-TOKEN";
const CSRF_HEADER_NAME = "X-CSRF-TOKEN";

// Generate a random CSRF token
const generateCsrfToken = (): string => {
    return crypto.randomBytes(32).toString("hex");
};

export const csrfMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        let csrfToken = req.cookies[CSRF_COOKIE_NAME] || req.headers[CSRF_HEADER_NAME] || req.body?.csrfToken;

        // Generate a new CSRF token only if the client does not have one
        if (!csrfToken) {
            csrfToken = generateCsrfToken();
            // Set CSRF token in cookie
            res.cookie(CSRF_COOKIE_NAME, csrfToken, {
                httpOnly: false, // Allow frontend JS to access it
                secure: secret.nodeEnv === "production",
                sameSite: "strict",
                maxAge: CSRF_TOKEN_EXPIRY
            });

            // Send CSRF token in response headers (for mobile clients)
            res.setHeader(CSRF_HEADER_NAME, csrfToken);

            // Send CSRF token in response body (for mobile clients)
            res.json({ csrfToken });
        }
        // Validate CSRF token for modifying requests (POST, PUT, PATCH, DELETE)
        if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method.toUpperCase())) {
            const csrfHeader = req.headers[CSRF_HEADER_NAME.toLowerCase()] as string;
            const csrfBody = req.body?.csrfToken;
            const csrfCookie = req.cookies[CSRF_COOKIE_NAME];

            // Corrected validation: Allow request if at least one token matches
            if (csrfHeader == csrfToken || csrfBody == csrfToken || csrfCookie == csrfToken) {
                return next(); // Allow request to proceed
            }
            return next(new UnauthorizedError("Invalid CSRF token"));
        }
        return next();
    } catch (error) {
        return next(new UnauthorizedError("CSRF protection error: " + error));
    }
};
