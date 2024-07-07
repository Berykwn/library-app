import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
// import Combobox from "../components/combobox";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  return (
    <nav className="mx-auto flex container items-center justify-between p-6 lg:px-8 [&>*]:font-semibold [&>*]:leading-6 [&>*]:text-gray-900 [&>*]:dark:text-white">
      <Link className="text-xl tracking-widest" to="/">
        BookQuest
      </Link>
      <div className="flex gap-4 items-center justify-end">
        {/* <Combobox /> */}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src="http://res.cloudinary.com/hypeotesa/image/upload/v1698904587/kitchen-sink/h8j7s2qrms4mrielzt77.png"
                alt="gebw"
              />
              <AvatarFallback>BQ</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-44"
            align="end"
            forceMount
            style={{ pointerEvents: "auto" }}
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/register">Register</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
