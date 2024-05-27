"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const login = async (email: string, password: string) => {
    console.log(email, password);

    revalidatePath();
    revalidateTag();
}