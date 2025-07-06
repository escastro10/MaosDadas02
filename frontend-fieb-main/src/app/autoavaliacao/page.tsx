'use client'
import { getAutoAvaliacaoAreas } from "@/api/autoavaliacao/get-all";
import TitleSection from "@/components/title-section";
import AppLayout from "@/layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { Earth } from "lucide-react";
import Link from "next/link";

export default function Page() {

    const { data: areas } = useQuery({
        queryKey: ['autoavaliacao-areas'],
        queryFn: getAutoAvaliacaoAreas
    })

    return (
        <AppLayout>
            <TitleSection
                title="Autoavaliação"
                description="Selecione um indicador para verificar as autoavaliações."

            />
            <div className="mt-12 grid grid-cols-5 gap-5">
                {areas && areas?.map((area) => (
                    <Link key={area?.id} href={`/autoavaliacao/${area?.slug}`} className="bg-[#fff] cursor-pointer hover:bg-emerald-500 hover:text-white transition-all hover:scale-[101%] rounded-2xl gap-2 items-center justify-center h-36 p-4 flex flex-col text-lg font-semibold text-emerald-700">
                        <Earth className="size-12" />
                        {area?.name}
                    </Link>
                ))}
            </div>
        </AppLayout>
    )
}