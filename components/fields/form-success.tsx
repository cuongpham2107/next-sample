import React from "react";

export const FormSuccess = ({ sccesss }: { sccesss: any[] }) => {
    return (
        <div className="flex flex-col gap-2">
            {sccesss.map((sccess, index) => (
                <p key={index} className="text-green-500 text-sm">{sccess}</p>
            ))}
        </div>
    );
}