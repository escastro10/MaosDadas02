'use client'

import { createIndiceRemissivo } from '@/api/indices-remissivos/create';
import TitleSection from '@/components/title-section';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AppLayout from '@/layouts/AppLayout';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Pencil, Plus } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getIndices } from '@/api/indices-remissivos/get-all';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';

const types = [
    "ESG",
    "GRI",
    "ODS"
]

const schema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    type: z.string().min(1, "O tipo é obrigatório"),
})

type IndiceRemissivo = z.infer<typeof schema>

// Componente para o botão de edição
const EditButton = () => (
    <div className='p-2 flex items-center justify-center rounded-full bg-blue-600 cursor-pointer hover:bg-blue-900 transition-all size-12'>
        <Pencil weight='duotone' className='text-white' size={20} />
    </div>
);

// Definição das colunas
const columns = [
    {
        accessorKey: 'name',
        header: 'Nome',
    },
    {
        accessorKey: 'type',
        header: 'Tipo',
        cell: ({ row }) => (
            <span className="font-semibold">{row.original.type}</span>
        ),
    },
    {
        id: 'actions',
        header: '#',
        cell: () => <EditButton />,
    },
];

// Componente para a DataTable com paginação
const DataTable = ({ data }) => {
    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 6,
            },
        },
    });

    if (!data || data.length === 0) {
        return <div className="mt-12 w-full bg-[#fff] p-3 rounded-xl text-center">Nenhum dado disponível</div>;
    }

    return (
        <div className='mt-12 w-full bg-[#fff] p-3 rounded-xl'>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex flex-col mt-6 ml-4 justify-center space-x-2 py-4">
                <div className="flex items-center gap-2">
                    <button
                        className='bg-blue-100 text-blue-950 px-4 py-2 rounded-lg'
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsLeft size={20} />
                    </button>
                    <button
                        className='bg-blue-100 text-blue-950 px-4 py-2 rounded-lg'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        className='bg-blue-200 text-blue-950 px-4 py-2 rounded-lg'
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight size={20} />
                    </button>
                    <button
                        className='bg-blue-200 text-blue-950 px-4 py-2 rounded-lg'
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronsRight size={20} />
                    </button>
                </div>
                <span className="text-gray-500 mt-2.5">
                    Página <strong className='text-blue-600'>{table.getState().pagination.pageIndex + 1}</strong> de {table.getPageCount()}
                </span>
            </div>
        </div>
    );
};

// Componente principal da página
export default function IndicesRemissivosPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, resetField } = useForm<IndiceRemissivo>({
        resolver: zodResolver(schema)
    })

    const [selectedType, setSelectedType] = useState<string | null>(null);

    const { mutateAsync: newIR } = useMutation({
        mutationFn: createIndiceRemissivo
    })

    const { data: indices, isLoading, isError, refetch } = useQuery({
        queryKey: ['indices'],
        queryFn: getIndices
    })

    async function handleNewIR(data: IndiceRemissivo) {
        try {
            await newIR({
                name: data.name,
                type: selectedType
            })
            toast.success('Índice remissivo criado com sucesso!')
            refetch()
            resetField('name')
        } catch {
            toast.error('Erro ao criar índice remissivo!')
        }
    }

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (isError) {
        return <div>Erro ao carregar os dados</div>;
    }

    return (
        <AppLayout>
            <TitleSection title="Índices Remissivos" />
            <Dialog>
                <DialogTrigger>
                    <Button className='mt-12 w-40 gap-2'>
                        <Plus weight='bold' size={20} /> Novo Índice
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form onSubmit={handleSubmit(handleNewIR)} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="font-semibold">Nome</label>
                            <input
                                {...register('name')}
                                type="text"
                                id="name"
                                className="w-full border outline-none focus:border-blue-500 border-gray-300 rounded-lg p-2"
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="type" className="font-semibold">Tipo</label>
                            <select
                                {...register('type')}
                                id="type"
                                className="w-full border border-gray-300 focus:border-blue-500 outline-none rounded-lg p-2"
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value="">Selecione um tipo</option>
                                {types.map((type, i) => (
                                    <option key={i} value={type}>{type}</option>
                                ))}
                            </select>
                            {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                        </div>
                        <div className="flex items-center justify-end">
                            <div className="flex items-center gap-3">
                                <DialogClose className='w-[200px]'>
                                    <Button type="button" variant='secondary'>Cancelar</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <DataTable data={indices} />
        </AppLayout>
    );
}
