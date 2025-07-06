'use client'
import Header from "@/components/header";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";

import HeroLoading from '@/animations/hero-loading.json';

type AppLayoutProps = {
    children?: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {

    const { data, isLoading, error } = useQuery({
        queryKey: ['api'],
        queryFn: async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL)
            return res.json()
        }
    })

    const router = useRouter()

    const { isSignedIn } = useAuth()

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-1">
                <img src="/fieb-blue.png" className="size-52 animate-pulse object-contain" alt="" />
                <Lottie animationData={HeroLoading} className="size-36 -mt-20 -ml-6" />
            </div>
        )
    }

    if (!isSignedIn) {
        return (
            <>
                {router.push('/login')}
            </>
        )
    }

    if (!error && data) {
        return (
            <div>

                <Header />

                <div className="px-4 md:px-16 h-screen mt-12 mb-12">

                    {children}

                </div>
            </div>
        )
    }
}
