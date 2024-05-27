"use client"
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";
import { GithubIcon, GoogleIcon, TwitterIcon } from "@/components/icons";

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
            <Card className="min-w-[400px] bg-gray-200 dark:bg-neutral-950 shadow-xl">
                <CardHeader className="flex gap-4 justify-center items-center">
                    <div className="flex flex-col p-2 ">
                        <p className="text-xl font-semibold">{headerLabel}</p>
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
