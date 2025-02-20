import { z } from "zod";

export const propertySchema = z.object({
    address: z.string().min(5, "Address must be at least 5 characters").trim(),
    city: z.string().min(2, "City is required").trim(),
    state: z.string().min(2, "State is required").trim(),
    zip: z
        .string()
        .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format")
        .trim(),
    country: z.string().min(2, "Country is required").trim(),

    property_condition: z.enum([
        "Excellent",
        "Good",
        "Average",
        "Fair",
        "Poor",
    ]),

    square_footage: z.coerce
        .number()
        .positive("Square footage must be greater than zero")
        .int("Square footage must be a whole number")
        .max(10000, "Square footage seems unusually large"),

    comparable_sales: z.array(
        z.object({
            address: z
                .string()
                .min(5, "Address must be at least 5 characters")
                .trim(),
            square_footage: z.coerce
                .number()
                .positive("Square footage must be greater than zero")
                .int("Square footage must be a whole number")
                .max(10000, "Square footage seems unusually large"),
            sale_price: z.coerce
                .number()
                .positive("Sales Price must be greater than zero")
                .max(100000000, "Square footage seems unusually large"),
            property_condition: z.enum([
                "Excellent",
                "Good",
                "Average",
                "Fair",
                "Poor",
            ]),
        })
    ),
    // .min(1, "At least one comparable sale is required"),
});

export type propertyFormType = z.infer<typeof propertySchema>;
