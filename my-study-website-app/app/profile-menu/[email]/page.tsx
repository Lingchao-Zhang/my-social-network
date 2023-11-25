"use client"

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SessionInterface } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/utils";

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
    const searchParams = useSearchParams().get('session')
    const sessionInfo = searchParams ? JSON.parse(searchParams) : {user: {}}
    const userSession = session ? session : sessionInfo
    const router = useRouter()
    const [openModal, setOpenModal] = useState(false);
    const [sharework, setSharework] = useState("Share Work")

    const handleSignOut = () => {
        setSharework("")
        router.push("../")
    }
    return (
        <div className="flexCenter z-10 flex-col relative">
            <Menu as="div">
                <Menu.Button className="flexCenter" onMouseEnter={() => setOpenModal(true)} >
                    {userSession?.user?.avatarUrl ? (
                        <Image
                            src={userSession.user.avatarUrl}
                            width={40}
                            height={40}
                            className="rounded-full"
                            alt="user profile image"
                        />
                    ): <></>}
                </Menu.Button>

                <Transition
                    show={openModal}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        static
                        className="flexStart profile_menu-items"
                        onMouseLeave={() => setOpenModal(false)}
                    >
                        <div className="flex flex-col items-center gap-y-4">
                            {userSession?.user?.avatarUrl ? (
                                <Image
                                    src={userSession?.user?.avatarUrl}
                                    className="rounded-full"
                                    width={80}
                                    height={80}
                                    alt="profile Image"
                                />
                            ):<></>}
                            <p className="font-semibold">{userSession?.user?.name}</p>
                        </div>

                        <div className="flex flex-col gap-3 pt-10 items-start w-full">
                            <Menu.Item>
                                <Link href={`/profile/${userSession?.user?.id}`} className="text-sm">Work Preferences</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href={`/profile/${userSession?.user?.id}`} className="text-sm">Settings</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href={`/profile/${userSession?.user?.id}`} className="text-sm">Profile</Link>
                            </Menu.Item>
                        </div>
                        <div className="w-full flexStart border-t border-nav-border mt-5 pt-5">
                            <Menu.Item>
                                {
                                    session ? 
                                    (
                                     <button type="button" className="text-sm" onClick={() => signOut()}> 
                                        Sign out
                                     </button>
                                    )
                                    :
                                    (
                                     <button type="button" className="text-sm" onClick={() => handleSignOut()}> 
                                        Sign out
                                     </button>
                                    )
                                }
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            {
                session ? 
                <Link href={`/create-project?${createQueryString('session', JSON.stringify(session))}`}>
                    {sharework}
                </Link>
            :
                <>
                    <Link href={`../create-project?${createQueryString('session', JSON.stringify(userSession))}`}>
                        {sharework}
                    </Link>
                    <Link href={"../"}>
                        view all projects
                    </Link>
                </>
            }
        </div>
    )
}

export default ProfileMenu