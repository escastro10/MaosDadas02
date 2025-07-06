'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil } from "phosphor-react";

// Componente para o botão de edição
const EditButton = () => (
    <div className='p-2 flex items-center justify-center rounded-full bg-blue-600 cursor-pointer hover:bg-blue-900 transition-all'>
        <Pencil weight='duotone' className='text-white' size={24} />
    </div>
);


export const IndexTable = ({ indices }) => (
    <div className='mt-12 w-full bg-[#fff] p-3 rounded-xl'>
        <Table>
            <TableCaption>Lista com todos os Indices Remissivos.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-full'>Nome</TableHead>
                    <TableHead className='w-full'>Tipo</TableHead>
                    <TableHead className='text-right w-full'>#</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {indices.map((index, i) => (
                    <TableRow key={i}>
                        <TableCell>{index.name}</TableCell>
                        <TableCell className='font-semibold'>{index.type}</TableCell>
                        <TableCell className='w-[300px]'>
                            <EditButton />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);
