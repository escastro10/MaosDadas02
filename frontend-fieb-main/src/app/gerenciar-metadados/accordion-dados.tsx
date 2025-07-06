'use client'
import { getAreasByPeriod } from "@/api/area/get-areas"
import { listIndicadoresByCategoryId } from "@/api/indicadores/list-by-category-id"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { CaretRight, Pencil, Plus } from "phosphor-react"
import { useState } from "react"

export function AccordionDados({ selectedPeriod }: { selectedPeriod: string }) {

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const { data: areas } = useQuery({
        queryKey: ["areas", selectedPeriod],
        queryFn: () => getAreasByPeriod({ periodId: selectedPeriod }),
    })

    const { data: indicadores } = useQuery({
        queryKey: ["indicadores", selectedCategory],
        queryFn: () => listIndicadoresByCategoryId(selectedCategory),
    })

    console.log(indicadores)

    const handleSelectCategory = (value: string) => {
        setSelectedCategory(value);
    }



    return (
        <Accordion type="single" collapsible className="w-full px-2">
            {areas?.map((area) => (
                <AccordionItem key={area?.id} value={area.id}>
                    <AccordionTrigger onClick={() => setSelectedCategory('')}>{area.name}</AccordionTrigger>
                    <AccordionContent className="grid grid-cols-3 gap-8 p-8">
                        <div className="flex flex-col w-full">
                            <div className="p-2 w-[130px] rounded bg-zinc-200 text-lg uppercase font-bold">
                                Categorias
                            </div>
                            <div className="space-y-2 mt-1.5 w-full">
                                {
                                    area?.categories.map((category) => (
                                        <div onClick={() => handleSelectCategory(category?.id)} key={category.id} className="flex items-center gap-1 border rounded-lg max-w-sm p-2 text-blue-500 text-lg uppercase cursor-pointer hover:bg-zinc-100">
                                            <CaretRight size={18} />
                                            {category.name}
                                        </div>
                                    ))
                                }

                                <Link href={`/nova-categoria/${area?.id}`}>
                                    <Button>
                                        <Plus size={18} />
                                        Cadastrar Categoria
                                    </Button>
                                </Link>



                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="p-2 w-[140px] rounded bg-zinc-200 text-lg uppercase font-bold">
                                Indicadores
                            </div>
                            <div className="space-y-2 mt-1.5">
                                {
                                    selectedCategory && (
                                        indicadores?.length > 0 ? indicadores?.map((indicador) => (
                                            <div key={indicador?.id} className="mb-5">
                                                <Link href={`indicadores-sustentaveis/${area?.period?.year}/${area?.slug}`} key={indicador.id} className="flex items-center gap-1 border rounded-lg max-w-sm p-2 text-blue-500 text-lg uppercase cursor-pointer hover:bg-zinc-100">
                                                    <CaretRight size={18} />
                                                    {indicador.pergunta}
                                                </Link>
                                            </div>
                                        )) : (
                                            <div>
                                                <span className="text-gray-500">Nenhum indicador cadastrado.</span>
                                            </div>
                                        )
                                    )
                                }

                                {indicadores?.length > 0 && (
                                    <Link href={`/indicadores-sustentaveis/editar/${selectedCategory}`} passHref>
                                        <Button variant="secondary">
                                            <Pencil size={18} />
                                            Editar Indicadores
                                        </Button>
                                    </Link>
                                )}

                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}

        </Accordion>
    )
}
