import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: '#4f46e5',
          },
        }}
      />
    </div>
  )
}
