import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <section className='py-24 w-full  flex items-center justify-center'>
       <SignIn />
    </section>
  )
}