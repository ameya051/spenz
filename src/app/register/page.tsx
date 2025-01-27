import Image from "next/image"
import Logo from "@/components/logo"
import Link from "next/link"
import RegisterForm from "@/components/register/registerForm"

export default function RegisterPage() {
    return (
        <div className="container mx-auto relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="lg:p-8 px-4 mx-auto max-w-3xl">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your details below to create your account
                        </p>
                    </div>
                    <RegisterForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Have an account?{" "}
                        <Link
                            href="/login"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Login
                        </Link>
                        .
                    </p>
                </div>
            </div>
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

        </div>
    )
}

