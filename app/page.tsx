import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    console.log("Home session:", session);
    if (!session?.user?.id) {
        redirect("/sign-in");
    } else {
        redirect("/appraisal");
    }
}
