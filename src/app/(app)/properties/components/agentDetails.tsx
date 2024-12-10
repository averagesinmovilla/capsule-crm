import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function AgentDetails() {
    return (
        <div className="border p-4 rounded-md">
            <h3 className="text-sm font-bold mb-6">Agent details</h3>
            <div className="flex items-center">
                <Avatar className="h-[80px] w-[80px] mr-4">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                    <span>Helen Bond</span>
                    <span>Ray White Inner North</span>
                </div>
            </div>
        </div>
    );
}

export default AgentDetails;
