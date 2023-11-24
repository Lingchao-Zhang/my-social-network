import { ProjectCard } from "@/components"
import { fetchAllProjects } from "@/lib/actions"
import { ProjectInterface, ProjectSearch } from "@/types"

export default async function Home() {
  const projectsData = await fetchAllProjects() as ProjectSearch 
  const projectsToDisplay = projectsData?.projectSearch?.edges || []

  return (
    projectsToDisplay.length === 0 ? 
      <section className='flex-start flex-col paddings mb-16'>
        <h1>Categories</h1>
        <p className="no-result-text text0center">No projects found, go create some first.</p>
      </section>
      :
      <section className='flex-start flex-col paddings mb-16'>
        <h1>Categories</h1>
        <section className="projects-grid">
          {
            projectsToDisplay.map(({ node }: { node: ProjectInterface}) => (
              <ProjectCard 
               key={node.id}
               id={node.id}
               image={node.image}
               title={node.title}
               userId={node.createdBy.id}
               userName={node.createdBy.name}
               avatarUrl={node.createdBy.avatarUrl}
              />
            ))
          }
        </section>
        <h1>LoadMore</h1>
      </section>
  )
}

