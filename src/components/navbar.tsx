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
import Combobox from "../components/combobox";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useAuth } from "../utils/contexts/token";
import { UserProfile } from "../utils/apis/users/type";
import { useEffect, useState } from "react";
import { getUserProfile } from "../utils/apis/users/api";

const Navbar = () => {
  const { token, logout } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  return (
    <nav className="mx-auto flex container items-center justify-between p-6 lg:px-8 [&>*]:font-semibold [&>*]:leading-6 [&>*]:text-stone-500 [&>*]:dark:text-white">
      <Link className="text-xl tracking-widest" to="/">
        BookQuest
      </Link>
      <div className="flex gap-4 items-center justify-end">
        <Combobox />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              {token ? (
                <AvatarImage
                  src={userProfile?.profile_picture}
                  alt={userProfile?.full_name}
                />
              ) : (
                <AvatarFallback className="text-stone-500">BQ</AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48"
            align="end"
            forceMount
            style={{ pointerEvents: "auto", marginTop: "8px" }}
          >
            {token ? (
              <>
                <DropdownMenuLabel>
                  Hi! {userProfile?.full_name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/user-profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/admin-dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/my-cart">My cart</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={logout}>logout</button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            ) : (
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/register">Register</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
