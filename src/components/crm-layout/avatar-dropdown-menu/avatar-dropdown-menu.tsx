import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UserType } from '@/types/user.type';
import { useAuth } from '@/hooks/auth';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import { LogOut, Settings, User} from "lucide-react";
import React, {useCallback} from "react";
import ImageUpload from '@/components/ImageUpload';
import {UserService} from "@/services/user.service";
import {useForm} from "react-hook-form";
import {toast} from "@/hooks/use-toast";

const AvatarDropdownMenu = ({ user }: { user: UserType }) => {
    const { logout } = useAuth()
    const userService = new UserService();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            name: user.name,
        },
    });

    const onSubmit = async (data: { name: string }) => {
        try {
            await userService.patch(user.id, data);
            toast({ description : 'Profile updated successfully.' });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast({ description: "Failed to update profile", variant: "destructive" });
        }
    };

    return (
        <Dialog>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                className="object-cover object-center"
                                src={user.avatar_url}
                                alt="@shadcn"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DialogTrigger asChild>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                {...register("name")}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={user.email}
                                className="col-span-3"
                                readOnly={true}
                            />
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="rounded-full shadow mx-10" variant="outline">
                                    Upload Avatar
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-center">
                                        Upload your files
                                    </DialogTitle>
                                    <DialogDescription className="text-center">
                                        The only file upload you will ever need
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <ImageUpload fileUploaderService={userService}/>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <DialogFooter>
                        <Button type="submit"
                                disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save changes"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
);
}

export default AvatarDropdownMenu
