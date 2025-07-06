'use client'
import { getCategoryById } from "@/api/category/get-category-by-id";
import TitleSection from "@/components/title-section";
import AppLayout from "@/layouts/AppLayout";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChartBar, PlusCircle } from "phosphor-react";
import { useEffect, useState } from "react";

export default function Home() {
    const { categoryId } = useParams();

    const { data, error } = useQuery({
        queryKey: ['indicadores-sustentaveis', categoryId],
        queryFn: async () => {
            const { data } = await api.get(`/all-indicadores/${categoryId}`)
            return data
        }
    });

    const { data: category } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => getCategoryById(categoryId as string)
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredIndicators, setFilteredIndicators] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        if (data) {
            let filtered = data.filter(indicador =>
                indicador.pergunta.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (activeFilter === 'active') {
                filtered = filtered.filter(indicador => indicador.isHide === false);
            } else if (activeFilter === 'inactive') {
                filtered = filtered.filter(indicador => indicador.isHide === true);
            }

            setFilteredIndicators(filtered);
        }
    }, [data, searchTerm, activeFilter]);

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    return (
        <AppLayout>
            <div className="flex gap-2">
                <Link className="p-2 rounded-full border mr-4 size-12 bg-[#fff] duration-300 hover:shadow-xl flex items-center justify-center" href={`/gerenciar-metadados`}>
                    <ChevronLeft size={24} className="cursor-pointer text-blue-500" />
                </Link>
                <div>
                    <TitleSection title="Editar Indicadores" />
                    <span className="text-gray-500">Você estará editando os indicadores da Categoria <strong>{category?.name}</strong> no período de {category?.area?.period?.year}.</span>
                </div>
            </div>

            <div className="mt-12 mb-4">
                <div className="flex items-center gap-2 p-1 bg-zinc-50 border justify-center text-blue-600 max-w-[160px] rounded-full">
                    <ChartBar size={24} />
                    <h1 className="text-lg">Indicadores</h1>
                </div>

                <span className="text-base mt-1.5 text-gray-500 ml-1">Escolha um Indicador para Editar</span>
            </div>

            <div className="flex bg-[#fff] group rounded-lg px-2 focus-within:border-blue-500/60 transition-all focus-within:shadow-lg focus-within:shadow-black/5 border items-center gap-1 mt-2 mb-5 w-[350px]">
                <Search size={20} className="group-focus-within:text-blue-500 text-gray-500" />
                <input
                    placeholder="Busque um indicador pelo nome..."
                    className="w-full h-10 rounded-lg outline-none bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="my-4">
                <p>Filtre os indicadores</p>
                <div className="flex items-center gap-3">
                    <button
                        className={`rounded-lg px-4 py-2 ${activeFilter === 'all' ? 'bg-blue-500 text-white font-bold' : 'bg-gray-200 text-gray-500'}`}
                        onClick={() => handleFilterChange('all')}
                    >
                        Todos
                    </button>
                    <button
                        className={`rounded-lg px-4 py-2 ${activeFilter === 'active' ? 'bg-green-400 text-green-900 font-bold' : 'bg-gray-200 text-gray-500'}`}
                        onClick={() => handleFilterChange('active')}
                    >
                        Ativos
                    </button>
                    <button
                        className={`rounded-lg px-4 py-2 ${activeFilter === 'inactive' ? 'bg-red-400 text-red-900 font-bold' : 'bg-gray-200 text-gray-500'}`}
                        onClick={() => handleFilterChange('inactive')}
                    >
                        Inativos
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
                {filteredIndicators.map(indicador => (
                    <Link href={`/indicadores-sustentaveis/editar/${categoryId}/${indicador?.id}`} passHref className="w-full overflow-hidden text-lg px-4 h-12 rounded-lg flex items-center font-semibold gap-2 border hover:bg-blue-500 duration-300 hover:text-white justify-between text-blue-400 group cursor-pointer bg-[#fff] hover:scale-[102%]" key={indicador.id}>
                        <p className="truncate">
                            {indicador.pergunta}
                        </p>
                        <ChevronRight size={24} />
                    </Link>
                ))}
                <Link href={`/indicadores-sustentaveis/criar/${category?.areaId}/${categoryId}`} passHref className=" overflow-hidden text-lg px-4 h-12 rounded-lg flex items-center font-semibold gap-2 border hover:bg-violet-500 duration-300 hover:text-white group w-[300px] text-violet-950 group cursor-pointer bg-violet-100 hover:scale-[101%]">
                    <PlusCircle size={24} weight="duotone" />
                    <p className="truncate">
                        Cadastrar Novo Indicador
                    </p>
                </Link>
            </div>
        </AppLayout>
    );
}
