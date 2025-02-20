import { createSwaggerSpec } from "next-swagger-doc";

/**
 *
 * Generates Swagger documentation for the API.
 * @returns Promise<object> - The Swagger documentation.
 * */
export const getApiDocs = async () => {
    const spec = await createSwaggerSpec({
        apiFolder: "/app/api",
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Appraisal API",
                version: "1.0.0",
            },
            security: [],
        },
    });
    return spec;
};
