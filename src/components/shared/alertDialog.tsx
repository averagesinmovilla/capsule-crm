'use client';

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AlertDialogProps {
    title: string;
    description: string;
    onAccept: () => void;
    triggerText: string;
    variantButtonTrigger: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ title, description, onAccept, triggerText, variantButtonTrigger }) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={variantButtonTrigger === "destructive" ? "destructive" : "outline"}>
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="outline" asChild>
                        <DialogTrigger>Cancel</DialogTrigger>
                    </Button>
                    <Button variant="destructive" onClick={onAccept}>
                        Accept
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AlertDialog;
