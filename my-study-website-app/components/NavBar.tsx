import { NavLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"

const NavBar = () => {
    return(
        <nav className="flexBetween navbar">
            <div className="flex-1 flexStart gap-10">
                <Link href="/">
                    <Image 
                      src="/logo.svg"
                      width={115}
                      height={43}
                      alt="logo"
                    />
                </Link>
                <ul className="xl:flex hidden text-small gap-7">
                    {
                        NavLinks.map((navLink) => 
                        <Link key={navLink.key} href={navLink.href}>{navLink.text}</Link>
                        )
                    }
                </ul>
            </div>
            <div className="flexCenter gap-4">
            </div>
        </nav>
    )
}

export default NavBar