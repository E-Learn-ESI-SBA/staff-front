import { Notifications } from "./notifications";
import { UserNav } from "./user-menu";

export default function Header() {
    return (
        <header className="p-4 top-0 left-0 flex items-center justify-end  sticky z-50 bg-white">
                    <Notifications />
                    <UserNav />
        </header>
    );
}