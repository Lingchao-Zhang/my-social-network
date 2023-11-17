'use client'
import Image from "next/image"
import { getUser } from "../../lib/actions";
import { useState } from "react";
import { UserProfile } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserSignIn = () => {
    const [userEmail, setUserEmail] = useState("")
    const router = useRouter()
    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams();
        params.set(name, value);
    
        return params.toString();
      };
    
    const handleOnSignIn = async () => {
        if(userEmail === ""){
            alert("Please enter your email")
        }else{
            try{
                const userExist = await getUser(userEmail) as { user: UserProfile }
                if(!userExist.user){
                    alert("User not exist!")
                } else{
                    router.push(`./ProfileMenu/${userExist.user.email}?${createQueryString('session', JSON.stringify(userExist))}`)
                }

            }catch(error: any){
                console.log(error.message)
            }
        }
    }
    return(
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Image className="mb-7" src="/logo.svg" alt="logo" width={150} height={50}/>   
                <div className="w-full bg-white rounded-lg shadow">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in your account
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input value={userEmail} onChange={(event) => setUserEmail(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@provider.com"/>
                            </div>
                            <button onClick={handleOnSignIn} className="w-full text-white  bg-violet-400 hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign In</button>
                            <p className="text-sm font-light text-gray-500">
                                Don't have an account? <Link href="./UserSignUp" className="font-medium text-primary-600 hover:underline">Sign Up here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserSignIn
