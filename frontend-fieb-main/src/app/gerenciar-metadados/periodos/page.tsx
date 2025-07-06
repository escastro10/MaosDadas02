'use client'
import { getPeriods } from "@/api/periods/get-periods";
import TitleSection from "@/components/title-section";
import AppLayout from "@/layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { api } from "@/lib/axios";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Pencil } from "phosphor-react";
import { useState } from "react";
import { toast } from "sonner";

type PeriodEditProps = {
    id: string;
    year: number;
    open: boolean;
}

export default function Page() {

    const { data: periods, refetch } = useQuery({
        queryKey: ['periods'],
        queryFn: getPeriods
    })

    const [selectedPeriod, setSelectedPeriod] = useState<PeriodEditProps | null>(null);

    const handleSelectPeriod = (period: PeriodEditProps) => {
        setSelectedPeriod(period);
    }

    const handleChangeStatus = async (value) => {
        if (!selectedPeriod) return; // Guard clause if no period is selected

        try {
            await api.put(`/periods/${selectedPeriod.id}/status`, {
                status: value
            });

            // Update the selected period with the new status
            setSelectedPeriod(prev => prev ? { ...prev, open: value } : null);


            toast.success('Status atualizado com sucesso!')
            refetch()

        } catch {
            toast.error('Erro ao alterar')
        }

    }

    return (
        <AppLayout>
            <TitleSection
                title="Gerenciar Períodos"
                description="Aqui você pode gerenciar os períodos disponíveis para os metadados."
            />

            <Link href={'/gerenciar-metadados'} className="flex items-center gap-2 mt-5 p-2 text-blue-600 hover:bg-zinc-50 rounded-xl duration-200 cursor-pointer w-[230px]">
                <ChevronLeft size={24} />
                Voltar para Metadados
            </Link>

            <div className="mt-12 w-full bg-[#fff] p-3 rounded-xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Período</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">#</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {periods?.map((period) => (
                            <TableRow key={period.id}>
                                <TableCell className="text-blue-500 text-lg font-semibold">{period.year}</TableCell>
                                <TableCell>
                                    {period.open ? (
                                        <span className="text-green-500 p-1 rounded-xl bg-green-100">Aberto</span>
                                    ) : (
                                        <span className="text-red-500 p-1 rounded-xl bg-red-100">Fechado</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button
                                                onClick={() => handleSelectPeriod(period)}
                                                className="text-blue-500 hover:text-blue-700 p-2 hover:bg-zinc-200 rounded-full"
                                            >
                                                <Pencil weight="duotone" size={24} />
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Editando o Período</DialogTitle>
                                                <DialogDescription className="text-base">
                                                    Você está editando o período <strong className="text-blue-500 text-lg">{selectedPeriod?.year}</strong>
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="flex flex-col gap-2">
                                                <label>Status</label>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        value={+selectedPeriod?.open}
                                                        defaultChecked={selectedPeriod?.open}
                                                        onCheckedChange={handleChangeStatus}
                                                    />
                                                    <p className={clsx(
                                                        selectedPeriod?.open ? 'text-green-500' : 'text-red-500'
                                                    )}>
                                                        {selectedPeriod?.open ? 'Aberto' : 'Fechado'}
                                                    </p>
                                                </div>
                                            </div>

                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    )
}
