import { Modal } from "@/components"
import { getProjectById } from "@/lib/actions"
import { ProjectInterface } from "@/types"
import Image from "next/image"
import Link from "next/link"

const ProjectById = async ({ params: { id }}: { params: { id: string }}) => {
    const result = await getProjectById(id) as { project?: ProjectInterface }
    const project = result.project ? result.project : undefined
    const userProfileLink = `../profile/${project?.createdBy.id}`
    return(
        project ?
            <Modal>
                <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
                    <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
                        <Link href={userProfileLink}>
                            <Image 
                            src={project.createdBy.avatarUrl}
                            width={26}
                            height={24}
                            alt="user avatar"
                            />
                        </Link>
                        <div className="flex-1 flexStart flex-col gap-1">
                            <p className="self-start text-lg font-semibold">
                                {project.title}
                            </p>
                            <div className="user-info">
                                <Link href={userProfileLink}>
                                    {project.createdBy.name}
                                </Link>
                                <Image src="/dot.svg" width={4} height={4} alt="dot" />
                                <Link href={`/?category=${project.category}`} className="text-primary-purple font-semibold"> 
                                        {project.category}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <Image 
                        className="object-cover rounded-2xl"
                        src={project.image}
                        width={1064}
                        height={800}
                        alt="project poster"
                        />
                </section>
                <section className="flexCenter flex-col mt-20">
                    <p className="max-w-5xl text-xl font-normal">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap mt-5 gap-5">
                        <Link href={project.githubUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                            🖥 <span className="underline">Github</span> 
                        </Link>
                        <Image src="/dot.svg" width={4} height={4} alt="dot" />
                        <Link href={project.liveSiteUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                            🚀 <span className="underline">Live Site</span> 
                        </Link>
                    </div>
                </section>
            </Modal>
        :
        <p className="no-result">Failed to fetch the project info</p>
    )
}

export default ProjectById