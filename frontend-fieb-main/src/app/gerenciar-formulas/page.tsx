'use client'
import TitleSection from "@/components/title-section";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AppLayout from "@/layouts/AppLayout";
import Link from "next/link";
import { CirclesThreePlus, MagnifyingGlass, MathOperations, Pencil } from "phosphor-react";

export default function Page() {
    return (
        <AppLayout>
            <TitleSection title="Gerenciar Fórmulas" description="Crie e gerencie fórmulas personalizadas para obter os melhores resultados." />

            <div className="flex flex-col gap-4 mt-12 w-[250px]">

                <Dialog>
                    <DialogTrigger asChild>
                        <div className="bg-blue-700 cursor-pointer hover:bg-blue-800 transition-all px-4 py-2.5 rounded-2xl font-medium text-white flex items-center gap-2">
                            <CirclesThreePlus weight="duotone" size={24} />
                            Criar nova fórmula
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Criar nova fórmula</DialogTitle>
                            <DialogDescription>Adicione uma nova fórmula ao sistema.</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="font-medium text-gray-700">Nome da fórmula</label>
                                <input type="text" id="name" className="w-full p-2 focus:border-blue-500 border rounded-xl focus:outline-none" />
                            </div>
                            <Button>Cadastrar</Button>
                        </div>
                    </DialogContent>
                </Dialog>



            </div>

            <div className="w-[350px] mt-14 mb-6 flex items-center gap-3 px-3 py-2.5 border rounded-2xl group group-focus-within:border-blue-600">
                <MagnifyingGlass weight="duotone" size={24} className="text-gray-400" />
                <input type="text" placeholder="Buscar fórmula pelo nome..." className="w-full focus:outline-none bg-transparent" />
            </div>
            <div className="grid grid-cols-4 gap-5">

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <Link href={'/gerenciar-formulas/1'} className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </Link>
                </div>

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <div className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </div>
                </div>

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <div className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </div>
                </div>

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <div className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </div>
                </div>

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <div className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </div>
                </div>

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <div className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </div>
                </div>

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <div className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </div>
                </div>

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <div className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </div>
                </div>

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <div className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </div>
                </div>

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <div className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </div>
                </div>

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <div className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </div>
                </div>

                <div className="bg-[#fff] shadow-2xl shadow-black/10 rounded-2xl px-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-12 rounded-2xl bg-yellow-200 flex items-center justify-center">
                            <MathOperations weight="duotone" size={32} className="text-yellow-950" />
                        </div>
                        <h1 className="font-semibold">Turnover para Pessoas</h1>
                    </div>

                    <div className="size-10 hover:bg-zinc-200 transition-all cursor-pointer hover:scale-[102%] rounded-full bg-zinc-100 flex items-center justify-center">
                        <Pencil weight="duotone" size={24} className="text-blue-500" />
                    </div>
                </div>

            </div>
        </AppLayout>
    )
}
