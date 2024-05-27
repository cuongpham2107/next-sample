"use server";

import { RegisterSchema } from "@/schemas/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const register = async (name:string,email: string, password: string) => {
    const validatedFields = RegisterSchema.safeParse({ name,email, password });
    if (!validatedFields.success) {
        let errArr: any[] = [];
        const { errors: err } = validatedFields.error;
        for (var i = 0; i < err.length; i++) {
            errArr.push({ for: err[i].path[0], message: err[i].message });
        }
        return {
            message: "error",
            data: errArr,
        };
    }
    const { data } = validatedFields;
    const hasPassword = await bcrypt.hash(data.password, 10);

    const exitingUser = await db.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if(exitingUser){
        return {
            message: "error",
            data: [{ for: "email", message: "Email already exists" }],
        };
    }

    await db.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hasPassword,
        },
    });
    return {
        message: "success",
        data: [ "Register successful!"],
    };

}