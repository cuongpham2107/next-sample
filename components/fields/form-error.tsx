import React from "react";

export const FormError = ({ errors }: { errors: any[] }) => {
    return (
        <div className="flex flex-col gap-2">
            {errors.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error.message}</p>
            ))}
        </div>
    );
}