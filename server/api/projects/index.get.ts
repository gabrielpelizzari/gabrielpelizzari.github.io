import { listPortfolioProjects } from '../../utils/projects'

export default defineEventHandler(async () => {
  const projects = await listPortfolioProjects()
  return {
    projects,
  }
})
