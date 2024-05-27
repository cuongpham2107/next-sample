import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas/auth/index";
import { getUserByEmail } from "./data/user";

import bcrypt from "bcryptjs";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                
                if(validatedFields.success){
                    const {data} = validatedFields;

                    const user =  await getUserByEmail(data.email);
                    if(!user || !user.password) return null;
                    

                    const passwordMatch = await bcrypt.compare(data.password, user.password);

                    if(passwordMatch){
                        return user;
                    }
                }
                return null
            },
        }),
    ],
}satisfies NextAuthConfig