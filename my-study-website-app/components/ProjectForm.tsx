'use client'
import { projectFormType } from "@/types"
import Image from "next/image"
import { ChangeEvent, FormEvent, useState } from "react"
import FormField from "./FormField"
import CustomMenu from "./CustomMenu"
import { categoryFilters } from "@/constants"
import CustomButton from "./CustomButton"

const ProjectForm = ({ type, session }: projectFormType) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        liveSiteUrl: "",
        githubUrl: "",
        category: "",
    }
)
    const handleFormSubmit = (event: FormEvent) => {
    
    }

    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        const file = event.target.files?.[0]

        if(!file){
            return
        }else if(!file.type.includes('image')){
           return alert('please upload an image file!')
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            const result = reader.result as string
            handleOnStateChange('image', result)
        }

    }

    const handleOnStateChange = (FieldTitle: string, value: string) => {
        setForm((prevFrom) => (
            {
                ...prevFrom,
                [FieldTitle]: value
            }
        ))
    }

    return(
        <form
         onSubmit={handleFormSubmit}
         className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {
                        !form.image ?
                        "Choose a poster for your project"
                        :
                        ""
                    }
                </label>
                <input 
                 id="image"
                 type="file"
                 accept="image/*"
                 required={type === 'create'}
                 className="form_image-input"
                 onChange={handleChangeImage}
                 />
                 {
                    form.image ? 
                    <Image 
                     src={form?.image}
                     className="sm:p-10 object-contain z-20"
                     alt="Project poster"
                     fill
                    />
                    :
                    <></>
                 }
            </div>
            <FormField 
             title="Title"
             state={form.title}
             setState={(value: string) => handleOnStateChange("title", value)}/>
             <FormField 
             title="Description"
             state={form.description}
             setState={(value: string) => handleOnStateChange("description", value)}/>
             <FormField 
             title="LiveSiteUrl"
             state={form.liveSiteUrl}
             setState={(value: string) => handleOnStateChange("liveSiteUrl", value)}/>
             <FormField 
             title="GitHubUrl"
             state={form.githubUrl}
             setState={(value: string) => handleOnStateChange("githubUrl", value)}/>
             <CustomMenu 
             title="Category"
             state={form.category}
             filters={categoryFilters}
             setState={(value: string) => handleOnStateChange('category', value)}
             />

             <div className="flexStart w-full">
                <CustomButton 
                 title={`${isSubmitting ? (type === 'create' ? 'Creating' : 'Editing') : (type === 'create' ? 'Create' : 'Edit')}`}
                 leftIcon={isSubmitting ? null : '/plus.svg'}
                 isSubmitting={isSubmitting}
                 bgColor="bg-[#3344AA]"
                 textColor="text-white"
                 />
             </div>
        </form>
    )
}

export default ProjectForm