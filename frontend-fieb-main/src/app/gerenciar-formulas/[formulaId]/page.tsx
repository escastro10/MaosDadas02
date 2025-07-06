'use client'
import TitleSection from '@/components/title-section'
import AppLayout from '@/layouts/AppLayout'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Page() {


    const router = useRouter()


    return (
        <AppLayout>
            <div className="flex gap-2">
                <div onClick={() => router.back()} className="p-2 rounded-full border mr-4 size-12 bg-[#fff] duration-300 hover:shadow-xl flex items-center justify-center">
                    <ChevronLeft size={24} className="cursor-pointer text-blue-500" />
                </div>
                <div>
                    <TitleSection title="Editar Fórmula" description='Gerencie e crie a lógica de uma fórmula.' />
                </div>
            </div>
        </AppLayout>
    )
}
