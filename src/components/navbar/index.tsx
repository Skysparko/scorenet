"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  User,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  tokens as TK,
  logOut,
  user as UD,
  imagePath as IP,
} from "@/store/slice/auth-slice";
import { useAppDispatch } from "@/store/hooks";
import { getPhoto } from "@/configs/api-config";
import ProfileModal from "../modals/profile-modal";
import Link from "next/link";


export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const router = useRouter();
  const token = useSelector(TK);
  const user = useSelector(UD);
  const imagePath = useSelector(IP);
  const dispatch = useAppDispatch();
  const menuItems = [
    { id: "my-profile", label: "My Profile" },
    { id: "team", label: "Team" },
    { id: "tournament", label: "Tournament" },
    { id: "player", label: "Player" },
    { id: "logout", label: "Logout" },
  ];

  const onProfileModalHide = () => {
    setShowProfileModal(false);
  };
  console.log("menuitems", isMenuOpen);
  return (
    <div className="bg-gray-200 shadow-md">
      <ProfileModal onHide={onProfileModalHide} show={showProfileModal} />
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        classNames={{ wrapper: "max-w-[1920px] dark" }}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href={"/"} className="font-bold text-inherit">
              ScoreNet
            </Link>
          </NavbarBrand>
        </NavbarContent>
        {token ? (
          <NavbarContent justify="end">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: getPhoto(imagePath as string, user?.image as string),
                  }}
                  className="transition-transform"
                  description={user?.email}
                  name={user?.name}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User Actions"
                variant="flat"
                className="text-black"
              >
                <DropdownItem
                  key="my_profile"
                  onClick={() => setShowProfileModal(true)}
                >
                  My Profile
                </DropdownItem>
                <DropdownItem key="team" onClick={() => router.push("/team")}>
                  Team
                </DropdownItem>
                <DropdownItem
                  key="tournament"
                  onClick={() => router.push("/tournament")}
                >
                  Tournament
                </DropdownItem>
                <DropdownItem
                  key="player"
                  onClick={() => router.push("/player")}
                >
                  Player
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => {dispatch(logOut()); location.reload()}}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem className="flex">
              <Button onClick={() => router.push("/login")}>Login</Button>
            </NavbarItem>
            <NavbarItem>
              <Button onClick={() => router.push("/register")}>Register</Button>
            </NavbarItem>
          </NavbarContent>
        )}

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item.id}-${index}`}
              className="cursor-pointer"
              onClick={() => {
                switch (item.id) {
                  case "logout":
                    dispatch(logOut());
                    location.reload()
                    break;
                  case "my-profile":
                    setShowProfileModal(true);
                    break;
                  default:
                    router.push("/" + item.id);
                }
              }}
            >
              {item.label}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
