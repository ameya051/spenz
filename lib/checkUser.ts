import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, user.id))
      .limit(1)
      .then(res => res[0] || null);

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db
      .insert(users)
      .values({
        id: crypto.randomUUID(),
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      })
      .returning();

    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};