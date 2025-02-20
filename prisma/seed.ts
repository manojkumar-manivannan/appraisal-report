import prisma from "../lib/db";
import { hash } from "bcrypt";

/*
 * Create a sample user in the database
 * @param email - The email of the user
 * @param password - The password of the user
 * @param firstName - The first name of the user
 * @param lastName - The last name of the user
 * @returns Promise<User | undefined> - The created user or undefined if error
 */
async function createSampleUser(
    email: string = "test@myreaa.com",
    password: string = "test",
    firstName: string = "Test",
    lastName: string = "User"
) {
    try {
        const hashedPassword = await hash(password, 10);
        return await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                approved: true,
            },
        });
    } catch (error) {
        console.error("Error creating sample user:", error);
    }
}

async function clearDatabase() {
    try {
        await prisma.user.deleteMany();
    } catch (error) {
        console.error("Error clearing database:", error);
    }
}

async function main() {
    // Clear the database
    await clearDatabase();

    // Create sample users
    await createSampleUser("amdin@myreaa.com", "admin", "Admin", "User");
    await createSampleUser("test@myreaa.com", "test", "Test", "User");
}

main()
    .then(() => console.log("Done seeding database"))
    .finally(async () => {
        await prisma.$disconnect();
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
