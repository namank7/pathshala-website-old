'use client'

import { Suspense } from 'react'
import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 7ba4be050bc1a7e6f761b864e9aebb3516faf32c
