'use client'

import { getAreaById } from "@/api/area/get-area-by-id"
import AutoConfetti from "@/components/ui/auto-confetti"
import AppLayout from "@/layouts/AppLayout"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useParams } from "next/navigation"
import { PlusCircle } from "phosphor-react"
import { BsGraphUpArrow } from "react-icons/bs"

export default function Page() {

    const { areaId } = useParams()

    const { data: area, refetch } = useQuery({
        queryKey: ['area', areaId],
        queryFn: () => getAreaById({ areaId: areaId as string })
    })

    return (
        <AppLayout>
            <AutoConfetti />

            <div className="flex flex-col items-center justify-center mt-32">
                <h1 className="text-2xl font-semibold text-emerald-600">Área cadastrada com sucesso!</h1>
                <img src="/success.svg" alt="" className="size-64 object-cover" />
                <span className="mt-6">Você acabou de cadastrar a Área de <strong>{area?.name}</strong> no período de <strong>{area?.period?.year}</strong></span>
                <Link href="/nova-area" className="">
                    <p className="flex items-center w-[220px] gap-2 mt-8 hover:bg-emerald-600 hover:text-white transition-colors p-2 bg-emerald-100 rounded-lg font-bold text-emerald-600">
                        <PlusCircle size={24} />
                        Cadastrar outra Área
                    </p>
                </Link>
                <Link className="flex w-[220px] items-center gap-2 hover:bg-blue-500 hover:text-white transition-colors p-2 rounded-lg mt-2.5 bg-blue-100 font-bold text-blue-700" href={`/indicadores-sustentaveis`}>
                    <BsGraphUpArrow size={24} />
                    Ir para Indicadores
                </Link>
            </div>
        </AppLayout>
    )
}
