import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";


export const checkUser = async () => {
    // Get the user from Clerk
    const user = await currentUser();

    // If no user, return null
    if (!user) {
        return null;
    }

    // Check if the user exists in the database 
    const loggedInUser = await db.user.findFirst({
        where: {
            clerkUserId: user.id, // check by Clerk user ID inside the database
        },
    });

    if (loggedInUser) {
        return loggedInUser;
    }

    const newUser = await db.user.create({
        data: {
            clerkUserId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0]?.emailAddress || "No email",
        }
    });

    return newUser;
}