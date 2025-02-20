import { Prisma } from "@prisma/client";

/**
 * Get a user-friendly error message from an error object
 * @param error - The error object to extract the message from
 * @return string - The extracted error message
 */
export const getErrorMsg = (error: unknown): string => {
    let msg: string;
    if (error instanceof Error) {
        msg = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
        msg = String(error.message);
    } else if (typeof error === "string") {
        msg = error;
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                msg = `Duplicate field value: ${error?.meta?.target}`;
            case "P2014":
                msg = `Invalid ID: ${error?.meta?.target}`;
            case "P2003":
                msg = `Invalid input data: ${error?.meta?.target}`;
            default:
                msg = `Something went wrong: ${error.message}`;
        }
    } else {
        msg = "An unexpected error occurred";
    }
    return msg;
};
