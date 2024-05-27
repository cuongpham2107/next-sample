"use client"
import * as z from "zod";

import { CardWapper } from "../fields/card-wapper";

import { LoginSchema } from "@/schemas/auth";
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon, MailIcon } from "@/components/icons";
import { useMemo, useState,useTransition } from "react";
import { FormError } from "../fields/form-error";
import { login } from "@/actions/auth/login";



export const LoginForm = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<any[]>([]);
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = LoginSchema.safeParse({ email, password});
            // refine errors
            if (!data.success) {
                let errArr: any[] = [];
                const { errors: err } = data.error;
                for (var i = 0; i < err.length; i++) {
                errArr.push({ for: err[i].path[0], message: err[i].message });
                }
                setErrors(errArr);
                throw err;
            }else{
                startTransition(() => {
                    login(email, password);
                })
               
            }
        
            setErrors([]);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <CardWapper 
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial={true}>
                <form onSubmit={onSubmit} className="flex flex-col gap-4" >
                    <Input 
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                        labelPlacement="outside"
                        size="lg"
                        disabled={isPending}
                        onChange={(e) => {
                            setErrors([]);
                            setEmail(e.target.value);
                        }}
                        // isInvalid={isInvalid(errors, "email")} 
                        // errorMessage={errors.find((error) => error.for === "email")?.message}
                        startContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        />
                     <Input
                        label="Password"
                        placeholder="Enter your password"
                        labelPlacement="outside"
                        size="lg"
                        disabled={isPending}
                        onChange={(e) => {
                            setErrors([]);
                            setPassword(e.target.value);
                        }}
                        // isInvalid={isInvalid(errors, "email")} 
                        // errorMessage={errors.find((error) => error.for === "password")?.message}
                      
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                      
                        />
                        <FormError errors={errors} />
                        <Button 
                            type="submit" 
                            disabled={isPending}
                            color="danger"
                        >Login</Button>
                </form>
        </CardWapper>
    );
}