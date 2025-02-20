import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import { getErrorMsg } from "@/utils";
import { hash } from "bcrypt";
import { signUpSchema } from "../../../schemas";

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user with email, password, first name, and last name.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123!
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 12345
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred
 */

export async function POST(req: Request) {
    try {
        // Parse the incoming request body
        const data = await req.json();
        const { email, password } = signUpSchema.parse(data);

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // If the user already exists, return an error
        if (existingUser) {
            return NextResponse.json(
                {
                    message: "User already exists",
                },
                {
                    status: 400,
                }
            );
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create the user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
            },
        });

        return NextResponse.json(
            {
                user: ((user: typeof newUser) => {
                    const { password, ...rest } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
                    return rest;
                })(newUser),
                message: "User created successfully",
            },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(getErrorMsg(err), {
            status: 500,
        });
    }
}
