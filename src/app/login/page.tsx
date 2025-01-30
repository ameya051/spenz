'use client'
import Image from "next/image"
import { LoginForm } from "@/components/login/loginform"
import Logo from "@/components/logo"
import Link from "next/link"
import { getUserInfo } from "@/lib/api/auth"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export default function LoginPage() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    retry:false
  })
  useEffect(() => {
    if (data) router.push('/dashboard');
  }, [data, router])

  return (
    <div className="container mx-auto relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900 md:p-24 p-10">
          <div className="relative aspect-square"><Image
            src="/tablet-login-animate.svg"
            fill
            alt="Login"
            className="object-cover w-full h-full"
          /></div>

        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo />
        </div>
      </div>
      <div className="lg:p-8 px-4 mx-auto max-w-3xl">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to login
            </p>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Create account
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

