import { getPortfolioProjectBySlug } from '../../utils/projects'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug obrigatório.' })
  }

  const project = await getPortfolioProjectBySlug(slug)
  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Projeto não encontrado.' })
  }

  return {
    project,
  }
})
