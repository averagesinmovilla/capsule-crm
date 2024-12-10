import Navigation from "@/components/structure/navigation";
import React from "react";
import { UserType } from '@/types/user.type';

const Header = ({ user }: { user: UserType }) => {
    return (
        <header>
            <Navigation user={user}/>
        </header>
    );
};

export default Header;
