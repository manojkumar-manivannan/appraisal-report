import { NextResponse } from "next/server";
import { generateWordDocument, getErrorMsg } from "@/utils";
import { getLMResponse } from "@/lib/openAI";
import { PropertyDetails } from "@/types/types";
import { generateAppraisalPrompt } from "./utils";
import { propertySchema } from "@/schemas";

/**
 * @swagger
 * /api/appraisal-report:
 *   post:
 *     summary: Generate an appraisal report
 *     description: Generates an appraisal report based on the provided property details and comparable sales.
 *     tags:
 *       - Appraisal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *                 description: The address of the property.
 *               city:
 *                 type: string
 *                 example: "Springfield"
 *                 description: The city where the property is located.
 *               state:
 *                 type: string
 *                 example: "IL"
 *                 description: The state where the property is located.
 *               zip:
 *                 type: string
 *                 example: "62701"
 *                 description: The ZIP code of the property.
 *               country:
 *                 type: string
 *                 example: "USA"
 *                 description: The country where the property is located.
 *               square_footage:
 *                 type: number
 *                 example: 1500
 *                 description: The size of the property in square footage.
 *               property_condition:
 *                 type: string
 *                 example: "Excellent"
 *                 description: The condition of the property.
 *               comparable_sales:
 *                 type: array
 *                 description: A list of comparable sales for the appraisal.
 *                 items:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                       example: "124 Main St"
 *                       description: The address of the comparable property.
 *                     sale_price:
 *                       type: number
 *                       example: 300000
 *                       description: The sale price of the comparable property.
 *                     square_footage:
 *                       type: number
 *                       example: 1400
 *                       description: The size of the comparable property in square footage.
 *                     property_condition:
 *                       type: string
 *                       example: "Good"
 *                       description: The condition of the comparable property.
 *             required:
 *               - address
 *               - city
 *               - state
 *               - zip
 *               - country
 *               - square_footage
 *               - property_condition
 *               - comparable_sales
 *     responses:
 *       200:
 *         description: The appraisal report has been created successfully.
 *         content:
 *           application/msword:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request data"
 *                 errors:
 *                   type: object
 *       500:
 *         description: There was an error creating the appraisal report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while generating the appraisal report."
 */

export async function POST(req: Request) {
    try {
        const validationResult = propertySchema.safeParse(await req.json());
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    message: "Invalid request data",
                    errors: validationResult.error,
                },
                { status: 400 }
            );
        }

        const propertyDetails: PropertyDetails = validationResult.data;
        const appraisalPrompt = generateAppraisalPrompt(propertyDetails);
        const appraisalReportText = await getLMResponse(appraisalPrompt);
        if (!appraisalReportText)
            return NextResponse.json(
                { message: "No response from language model" },
                { status: 500 }
            );
        const wordBuffer = await generateWordDocument(appraisalReportText);
        return new NextResponse(wordBuffer, {
            status: 200,
            headers: {
                "Content-Type":
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition":
                    'attachment; filename="AppraisalReport.docx"',
            },
        });
    } catch (err) {
        return NextResponse.json(
            {
                error: getErrorMsg(err),
                message:
                    "An error occurred while generating the appraisal report.",
            },
            {
                status: 500,
            }
        );
    }
}
