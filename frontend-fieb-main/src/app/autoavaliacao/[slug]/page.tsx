'use client'
import { getAutoavaliacaoAreaBySlug } from "@/api/autoavaliacao/get-by-slug";
import TitleSection from "@/components/title-section";
import AppLayout from "@/layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {

    const { slug } = useParams()

    const { data: area } = useQuery({
        queryKey: ['area', slug],
        queryFn: () => getAutoavaliacaoAreaBySlug(slug as string)
    })

    return (
        <AppLayout>
            <TitleSection title={area?.name} description={`Area de Autoavaliação`} />

            <section className="mt-12">
                {area && area?.Indicador.map(indicador => (
                    <Link key={area?.id} href={`/autoavaliacao/${slug}/${indicador.id}`} className="w-full flex items-center justify-between text-lg font-medium cursor-pointer hover:bg-purple-500 hover:text-white transition-all rounded-xl bg-[#fff] p-3 shadow-lg shadow-black/[2%]">
                        {indicador?.pergunta}
                        <ChevronRight />
                    </Link>
                ))}
            </section>
        </AppLayout>
    )
}
