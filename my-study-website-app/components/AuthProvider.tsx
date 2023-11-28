"use client"
import { useRouter } from "next/navigation"

const AuthProvider = () => {
    const router = useRouter()
    return(
        <div className="flex justify-center items-center text-center gap-4">
            <button onClick={() => router.push('/user-sign-in')} className="bg-violet-400 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded">
                Sign In
            </button>
            <button onClick={() => router.push('/user-sign-up')} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Sign Up
            </button>
        </div>
    )
}

export default AuthProvider
