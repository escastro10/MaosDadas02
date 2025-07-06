'use client'
import TitleSection from '@/components/title-section'
import AppLayout from '@/layouts/AppLayout'


import { getPeriods } from '@/api/periods/get-periods'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { MoreVertical, Settings2 } from 'lucide-react'
import Link from 'next/link'
import { ArrowArcRight, CalendarPlus, Plus } from 'phosphor-react'
import { useState } from 'react'
import { FaSquareArrowUpRight } from 'react-icons/fa6'
import { AccordionDados } from './accordion-dados'



export default function Page() {

    const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

    const { data: periods } = useQuery({
        queryKey: ["periods"],
        queryFn: getPeriods
    });

    async function handleSelectPeriod(value: string) {
        setSelectedPeriod(value);

    }

    return (
        <AppLayout>
            <TitleSection
                title='Gerenciar Metadados'
                description='Organize e gerencie os metadados do sistema.'
            />
            <div className="flex items-center gap-2 mt-1.5 w-[200px]">
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-200 text-blue-500 font-medium outline-none'>
                        <MoreVertical size={18} />
                        Opções
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='ml-12'>
                        <DropdownMenuItem className='text-base cursor-pointer font-medium flex items-center gap-2 p-2'>
                            <ArrowArcRight size={18} />
                            <Link href={'/indices-remissivos'}>
                                Índices Remissivos
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-base cursor-pointer font-medium flex items-center gap-2  mt-2 text-blue-500'>
                            <Plus size={18} />
                            <Link className='flex items-center gap-2' href='/indicadores-sustentaveis/criar'>
                                Cadastrar Novo Indicador
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className='text-base cursor-pointer font-medium flex items-center gap-2  text-emerald-600 mt-2 '>
                            <FaSquareArrowUpRight size={18} />
                            <Link className='flex items-center gap-2' href='/nova-area'>
                                Cadastrar Nova Área
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className='my-4'>
                <h1 className='text-lg font-bold'>Período</h1>
                <div className="flex items-center gap-2">
                    <Select onValueChange={handleSelectPeriod}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione um Período" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Períodos</SelectLabel>
                                {periods && periods.map((period) => (
                                    <SelectItem key={period.id} value={period.id}>
                                        {period.year}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>


                    <div className="w-96 flex items-center gap-2">

                        <Link href={'/novo-periodo'} className='hover:bg-blue-200 transition-colors px-4 py-2.5 font-semibold text-sm flex items-center gap-2 bg-blue-100 rounded-lg text-blue-700'>
                            <CalendarPlus size={18} weight='duotone' />
                            <span>Cadastrar Período</span>
                        </Link>


                        <Link href='/gerenciar-metadados/periodos'> <a className='hover:bg-zinc-50 transition-colors px-4 py-2.5 font-semibold text-sm flex items-center gap-2 bg-transparent rounded-lg text-blue-950 underline'>
                            <Settings2 size={18} />
                            Gerenciar Períodos</a></Link>
                    </div>



                </div>

            </div>

            <section className='mt-12 p-3 w-full bg-[#fff] rounded-xl'>
                <h1 className='mt-2 mx-2 text-lg font-bold border-b'>Área / Categoria / Indicador</h1>
                <AccordionDados selectedPeriod={selectedPeriod} />
            </section>

        </AppLayout>
    )
}
