import { CustomButtonType } from "@/types"
import Image from "next/image"

const CustomButton = ({ title, leftIcon, rightIcon, handleClick, isSubmitting, bgColor, textColor }: CustomButtonType) => {
    return(
            <button 
             onClick={handleClick} 
             className={`
             flexCenter gap-3 px-4 py-3 
             rounded-xl text-sm font-medium max-md:w-full
             ${textColor ? textColor : 'text-white'} 
             ${isSubmitting ? 'bg-black': (bgColor ? bgColor : 'bg-blue-600')}`}
             disabled={isSubmitting}
             >
                {
                    leftIcon ? 
                    <Image 
                    src={leftIcon}
                    width={20}
                    height={20}
                    alt="Left Icon"/>
                    :
                    <></>
                }
                {title}
                {
                    rightIcon ? 
                    <Image 
                    src={rightIcon}
                    width={20}
                    height={20}
                    alt="Right Icon"/>
                    :
                    <></>
                }
            </button>
    )
}

export default CustomButton