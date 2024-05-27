"use client"

import { CardWapper } from "@/components/fields/card-wapper";

import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon, MailIcon } from "@/components/icons";
import { useMemo, useState,useTransition } from "react";
import { FormError } from "@/components/fields/form-error";
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
        setErrors([]);
        startTransition(() => {
            login(email, password)
            .then((v : any) => {
                if (v.message === "error") {
                    setErrors(v.data);
                }
            })  
        }) 
    };

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <CardWapper 
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="register"
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