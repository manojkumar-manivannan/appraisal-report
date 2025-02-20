import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import { compare } from "bcrypt";

/**
 * NextAuth authentication options.
 * @see {@link https://next-auth.js.org/configuration/nextjs}
 */
export const authOptions: AuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET as string,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!existingUser) {
                    return null;
                }
                const passwordMatched = await compare(
                    credentials.password,
                    existingUser.password
                );

                if (!passwordMatched) {
                    return null;
                }
                return {
                    id: existingUser.id,
                    email: existingUser.email,
                    name: `${existingUser.firstName} ${existingUser.lastName}`,
                    password: existingUser.password,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
};
