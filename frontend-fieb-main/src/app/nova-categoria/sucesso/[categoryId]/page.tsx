'use client'
import { getCategoryById } from "@/api/category/get-category-by-id";
import { getIndices } from "@/api/indices-remissivos/get-all";
import AutoConfetti from "@/components/ui/auto-confetti";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/AppLayout";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, Database, PlusCircle } from "phosphor-react";
import { useState } from "react";
import { toast } from "sonner";

import { SiUnitednations } from "react-icons/si";



export default function Page() {

    const { categoryId } = useParams()




    const { data: category, refetch } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => getCategoryById(categoryId as string)
    })

    const { data: indices } = useQuery({
        queryKey: ['indices'],
        queryFn: getIndices
    })

    const [selectedIndice, setSelectedIndice] = useState<string | null>(null)

    const handleSelectedIndice = (value: string) => {
        setSelectedIndice(value)
    }

    const handleAddCode = async (categoryId: string, codeId: string) => {
        try {

            await api.post(`/category/${categoryId}/code`, {
                codeId
            })

            refetch()
            toast.success('Indice adicionado com sucesso!')

        }
        catch (err) {
            console.error(err)
            toast.error('Erro ao adicionar indice')
        }
    }

    return (
        <AppLayout>

            <AutoConfetti />

            <div className="flex items-center flex-col h-screen">
                <div className="space-y-1 flex flex-col items-center">
                    <div className="flex items-center justify-center size-14 rounded-full bg-green-500">
                        <Check size={32} color="#fff" />
                    </div>
                    <h1 className="text-lg font-bold">Categoria cadastrada com sucesso!</h1>
                    <p className="text-gray-500">Você cadastrou a categoria <span className="font-bold uppercase text-blue-500">{category?.name}</span></p>
                </div>

                <div className="mt-12 w-[400px]">

                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="w-full font-semibold rounded-lg text-blue-500 hover:bg-blue-100 hover:text-blue-800 duration-300 bg-[#fff] flex items-center gap-2 justify-center p-2.5">
                                <PlusCircle size={24} />
                                Adicionar Indice Remissivo
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Adicione um Índice Novo</DialogTitle>
                            </DialogHeader>

                            <div className="flex flex-col space-y-1">
                                <label htmlFor="">Índice</label>
                                <Select onValueChange={handleSelectedIndice}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um Indice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Indices Remissivos</SelectLabel>
                                            {indices?.map(item => (
                                                <SelectItem key={item?.id} value={item.id}>{item.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button className="mt-4" variant="primary" onClick={() => handleAddCode(categoryId as string, selectedIndice)}>Adicionar</Button>

                        </DialogContent>
                    </Dialog>

                    <Link href={'/gerenciar-metadados'}>
                        <Button className="mt-2">
                            <Database size={20} />
                            Gerenciar Metadados
                        </Button>
                    </Link>


                </div>

                <div className="flex flex-col gap-3 mt-12">
                    <div className="flex items-center gap-2 p-2.5 bg-slate-200 rounded-lg">
                        <SiUnitednations className="size-6" />
                        <p className="font-medium">Índices Remissivos</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        {category?.codes.map(item => (
                            <div key={item?.code?.id} className="flex items-center gap-2 p-2.5 justify-center bg-[#fff] rounded-lg">
                                <p className="font-semibold">{item.code.name}</p>
                            </div>
                        ))}
                    </div>

                </div>


            </div>

        </AppLayout>
    )
}
