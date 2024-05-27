"use client"

import { CardWapper } from "@/components/fields/card-wapper";
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon, MailIcon } from "@/components/icons";
import { useMemo, useState,useTransition } from "react";
import { FormError } from "@/components/fields/form-error";
import { FormSuccess } from "@/components/fields/form-success";
import { register }  from "@/actions/auth/register";


export const RegisterForm = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors([]);
        startTransition(() => {
            register(name,email, password)
            .then((v : any) => {
                if (v.message === "error") {
                    setErrors(v.data);
                }
                if (v.message === "success") {
                    console.log(v.data);
                    setSuccess(v.data);
                }
            })  
        }) 
    };
    return (
        <CardWapper 
            headerLabel="Create new account"
            backButtonLabel="Already have an account?"
            backButtonHref="/login"
            showSocial={true}>
                <form onSubmit={onSubmit} className="flex flex-col gap-4" >
                <Input 
                    type="text"
                    label="Name"
                    placeholder="Name"
                    labelPlacement="outside"
                    size="lg"
                    disabled={isPending}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    />
                <Input 
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    size="lg"
                    disabled={isPending}
                    onChange={(e) => {
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
                        setPassword(e.target.value);
                    }}
                    // isInvalid={isInvalid(errors, "email")} 
                    // errorMessage={errors.find((error) => error.for === "password")?.message}
                    
                    type={"password"}
                    
                    />
                    <FormError errors={errors} />
                    <FormSuccess sccesss={success} />
                    <Button 
                        type="submit" 
                        color="danger"
                        disabled={isPending}
                    >Register</Button>
                </form>
        </CardWapper>
    );
}