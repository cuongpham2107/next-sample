"use server";

import { LoginSchema } from "@/schemas/auth";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { DEFAULT_LOGIN_ADMIN_REDIRECT } from "@/routes";

export const login = async (email: string, password: string) => {
    const validatedFields = LoginSchema.safeParse({ email, password });
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

    try{
        await signIn("credentials",{
            email: data.email,
            password: data.password,
            redirectTo: DEFAULT_LOGIN_ADMIN_REDIRECT,
        });
    }catch(err){
        if(err instanceof AuthError){
            switch (err.type) {
                case "CredentialsSignin":
                    return {
                        message: "error",
                        data: [{ for: "password", message: "Email hoặc mật khẩu không đúng" }],
                    };
                default:
                    return {
                        message: "error",
                        data: [{ for: "password", message: "Đã có lỗi xảy ra" }],
                    };
            }
        }
        throw err;
    }
}