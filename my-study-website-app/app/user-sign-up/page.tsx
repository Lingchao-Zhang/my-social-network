'use client'
import { UserProfile, userSignUpInfo } from "@/types"
import Image from "next/image"
import { useState } from "react"
import { getUser, createUser } from "../../lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserSignUp = () => {
    const router = useRouter()
    const [userInfo, setUserInfo] = useState<userSignUpInfo>({
        email: "",
        name: "",
        avatarUrl: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
    })
    
    const handleOnChange = (event: any) => {
        const {name, value} = event.target
        setUserInfo((prevUserInfo) => {
            return {
                ...prevUserInfo,
                [name]: value
            }
        })
    }
    
    const handleOnSignUp = async () => {
        if(userInfo.email === ""){
            alert("Please enter your email")
        } else if(userInfo.name === ""){
            alert("Please enter your name")
        } else{
            try{
                const userExist = await getUser(userInfo.email) as {user: UserProfile}
    
                if(!userExist.user){
                    await createUser(userInfo.name, userInfo.email, userInfo.avatarUrl)
                    router.push('./user-sign-in')
                    alert("Sign up successfully")
                } else{
                    alert("this email has already been registered")
                }
    
            }catch(error: any){
                console.log(error.message)
            }
        }
    }

    return(
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Image className="mb-7" src="/logo.svg" alt="logo" width={150} height={50}/>   
                <div className="w-full bg-white rounded-lg shadow">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create your account
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input value={userInfo.email} name="email" onChange={handleOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@provider.com" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-90">Your user name</label>
                                <input value={userInfo.name} name="name" onChange={handleOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                            </div>
                            <button onClick={handleOnSignUp} className="w-full text-white bg-violet-400 hover:bg-violet-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account? <Link href="./user-sign-in" className="font-medium text-primary-600 hover:underline">Sign in here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserSignUp