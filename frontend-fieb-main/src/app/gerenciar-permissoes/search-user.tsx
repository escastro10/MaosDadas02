'use client'
import Link from "next/link";
import { MagnifyingGlass, UserPlus } from "phosphor-react";
import { useState } from "react";

const SearchUser = () => {

    const [open, setOpen] = useState(false);

    function handleOpenModal() {
        setOpen(true);
    }

    function handleCloseModal() {
        setOpen(false);
    }

    return (

        <div className='flex items-center gap-3 mt-12'>
            <div className='p-4 w-[350px] rounded-lg bg-[#fff] flex items-center gap-2'>
                <MagnifyingGlass className='size-5 text-gray-500' />
                <input type='text' placeholder='Busque por um usuário' className='bg-transparent w-full outline-none' />
            </div>

            <Link href='/gerenciar-permissoes/novo-usuario'>
                <button onClick={handleOpenModal} className='p-4 hover:bg-blue-800 transition-all gap-2 w-[250px] flex items-center justify-center rounded-lg bg-blue-700 text-white'>
                    <UserPlus size={22} />
                    Cadastrar Novo Usuário
                </button>
            </Link>

        </div>
    );
}

export default SearchUser;