import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {

  return (
    <section className='py-24 w-full  flex items-center justify-center'>
         <SignUp />
    </section>
  )
}