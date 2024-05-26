"use client"
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";
import { GithubIcon, GoogleIcon, TwitterIcon } from "../icons";

interface CardWapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const CardWapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial = false }: CardWapperProps) => {
    return (
        <>
            <Card className="max-w-[400px] shadow-sm">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-md">Auth</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    {children}
                </CardBody>
                <Divider />
                {showSocial ? (
                    <CardFooter>
                        <div className="flex items-center w-full gap-x-2">
                           <Button 
                                size="lg" 
                                color="default"
                                variant="solid" 
                                className="w-full"
                                onClick={() => {}}
                                >
                                    <GithubIcon className="text-default-500" />
                           </Button>
                            <Button 
                                color="default"
                                size="lg" 
                                variant="solid" 
                                className="w-full flex justify-center items-center"
                                onClick={() => {}}
                                >
                                    <GoogleIcon className="text-default-500" width={20} height={20} />
                            </Button>
                        </div>
                    </CardFooter>
                    
                ) : null}
                <CardFooter>
                    <Button 
                        variant="light"
                        className="w-full font-normal"
                        size="sm"
                    >
                        <Link href={backButtonHref}>{backButtonLabel}</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
};
