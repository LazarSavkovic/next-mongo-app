import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import { compare } from 'bcryptjs'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name:'credentials',
      async authorize(credentials, req){
        dbConnect().catch(error => {error: 'Connection failed' })

        const result = await User.findOne({email: credentials.email})
        if(!result){
          throw new Error('Nema korisnika sa ovim e-mailom')
        }
        
        const equalPasswords = await compare(credentials.password, result.password)
        
        if(!equalPasswords || result.email !== credentials.email){
          throw new Error('Korisnicko ime ili sifra se ne poklapa')
        }

        return result;

      }
    })
    // ...add more providers here
  ],
  secret: '7aiYsX0GKxOyjwJEiuEGLPWoWIJeSSBOx+vgqx8ABlM='
}
export default NextAuth(authOptions)