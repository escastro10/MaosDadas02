'use client'
import { getPeriods } from "@/api/periods/get-periods";
import TitleSection from "@/components/title-section";
import AppLayout from "@/layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Page() {

    const { data: periods } = useQuery({
        queryKey: ['periods'],
        queryFn: getPeriods
    })

    return (
        <AppLayout>
            <TitleSection title="Dashboard" description="Gere gráficos e relatórios dos indicadores." />

            <div className="mt-12">


                <div className="space-y-2">
                    <label>Escolha um período para visualizar</label>

                    <div className="grid grid-cols-5 gap-3">
                        {periods && periods.map((period: any) => (
                            <Link href={`/dashboard/${period.year}`} className="flex items-center hover:bg-blue-600 hover:text-white duration-300 h-14 px-4 font-semibold justify-between bg-[#fff] rounded-lg shadow" key={period.id}>
                                {period.year}
                                <ChevronRight size={18} />
                            </Link>
                        ))}
                    </div>


                </div>

            </div>

        </AppLayout>
    )
}
