'use client'
import { PaginationType } from "@/types"
import CustomButton from "./CustomButton"
import { useRouter } from "next/navigation"

const Pagination = ({ startCursor, endCursor, hasPreviousPage, hasNextPage}: PaginationType) => {
    const router = useRouter()

    const handleNavigation = (direction: string) => {
        // retrieve current search params
        const currentSearchParams = new URLSearchParams(window.location.search)
        if(direction === "previous"){
            currentSearchParams.delete("endCursor")
            currentSearchParams.set("startCursor", startCursor)
        } else if(direction === "next"){
            currentSearchParams.delete("startCursor")
            currentSearchParams.set("endCursor", endCursor)
        }
        const newSearchParams = currentSearchParams.toString()
        const newPathName = `${window.location.pathname}?${newSearchParams}`
        router.push(newPathName)
    }

    return(
        <div className="w-full flexCenter gap-5 mt-10">
            {
                hasPreviousPage ? 
                <CustomButton 
                 title="Previous Page"
                 handleClick={() => handleNavigation("previous")}
                 />
                :
                <></>
            }
            {
                hasNextPage ?
                <CustomButton 
                 title="Next Page"
                 handleClick={() => handleNavigation("next")}
                 />
                :
                <></>        
            }
        </div>
    )
}

export default Pagination