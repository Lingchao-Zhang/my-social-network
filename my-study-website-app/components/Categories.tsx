'use client'
import { categoryFilters } from "@/constants"
import { createQueryString } from "@/utils"
import { useRouter, useSearchParams } from "next/navigation"

const Categories = () => {
    const categorySearchParams = useSearchParams().get('category')
    const sessionSearchParams = useSearchParams().get('session')
    const category = categorySearchParams ? categorySearchParams : ""
    const session = sessionSearchParams ? sessionSearchParams : ""
    const router = useRouter()

    const handleCategoryToggle = (filter: string) => {
        const newPathName = `
        /?${createQueryString('category', filter)}&${createQueryString('session', session)}
        `
        router.push(newPathName)
    }

    return(
        <div className="flexBetween w-full gap-5 flex-wrap">
            <ul className="flex gap-2 overflow-auto">
                {
                    categoryFilters.map((filter) => (
                        <button
                            key={filter} 
                            onClick={() => handleCategoryToggle(filter)}
                            className={`${category === filter ? "bg-light-white-300 font-medium" : "font-normal"} px-4 py-3 rounded-lg capitalize whitespace-nowrap`}                    
                        >
                            {filter}
                        </button>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories