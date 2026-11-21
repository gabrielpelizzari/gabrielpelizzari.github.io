import { profileConfig } from '../../data/profile'
import { fetchGithubUser } from '../utils/github'

export default defineEventHandler(async () => {
  const githubUser = await fetchGithubUser(profileConfig.githubUsername)

  return {
    profile: profileConfig,
    githubUser,
  }
})
