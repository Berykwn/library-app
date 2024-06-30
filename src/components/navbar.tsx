import { Link, useNavigate } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
//   DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import Combobox from "../components/combobox";

const Navbar = () => {
  return (
    <header
      className="w-full sticky top-0 bg-white/90 dark:bg-black/90 z-50"
      aria-label="navbar"
    >
      <nav className="mx-auto flex container items-center justify-between p-6 lg:px-8 [&>*]:font-semibold [&>*]:leading-6 [&>*]:text-gray-900 [&>*]:dark:text-white">
        <Link className="text-xl tracking-widest" to="/">
          BookQuest
        </Link>
        <div className="flex gap-4 items-center justify-end">
          <Combobox />

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
            <DropdownMenuContent className="w-44" align="end" forceMount>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Light</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
