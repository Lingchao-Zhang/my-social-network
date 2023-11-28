import { getProjectsByUser } from "@/lib/actions"
import { ProjectInterface, RelatedProjectType, UserProfile } from "@/types"
import ProjectCard from "./ProjectCard"

const RelatedProjects = async ({ userId, projectId, userSession }: RelatedProjectType) => {
    const result = await getProjectsByUser(userId) as {user?: UserProfile}
    const projects = result.user?.projects?.edges ? result.user.projects.edges : []
    
    return(
        projects.length === 0 || projects.length === 1 ?
        <></> 
        : 
        <section className="projects-grid">
            {
                projects.map(({ node }: { node: ProjectInterface}) => (
                    node.id === projectId ?
                    <></>
                    :
                    <ProjectCard 
                     key={node.id}
                     id={node.id}
                     image={node.image}
                     title={node.title}
                     userId={node.createdBy.id}
                     userName={node.createdBy.name}
                     avatarUrl={node.createdBy.avatarUrl} 
                     currentUser={userSession}
                     />
                ))
            }
        </section>
    )
}

export default RelatedProjects