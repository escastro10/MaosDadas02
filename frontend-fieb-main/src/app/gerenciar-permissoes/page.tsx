'use client'
import TitleSection from '@/components/title-section'
import AppLayout from '@/layouts/AppLayout'
import { FolderLock, Pencil, ShieldPlus } from 'phosphor-react'

import { getUsers } from '@/api/users/get-users'
import { useQuery } from '@tanstack/react-query'
import { ShieldCloseIcon, Trash2 } from 'lucide-react'
import colors from '../tokens/colors'
import SearchUser from './search-user'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { Tooltip } from 'react-tooltip'
import { toast } from 'sonner'


export default function Page() {

    const { data: users, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })

    const handleAddAdmin = async (id: string) => {

        try {
            await api.put(`/user/${id}/admin`, {
                state: true
            })
            refetch()

            toast.success('Permissão de Administrador adicionada com sucesso.')

        } catch {

            toast.error('Erro ao adicionar permissão de Administr')
        }
    }

    const handleRemoveAdmin = async (id: string) => {
        try {
            await api.put(`/user/${id}/admin`, {
                state: false
            })
            refetch()

            toast.success('Permissão de Administrador removida com sucesso.')

        } catch {

            toast.error('Erro ao remover permissão de Administr')

        }

    }

    return (
        <AppLayout>
            <TitleSection

                title='Gerenciar Permissões'
                description='Organize e crie novos usuários dentro do sistema.'

            />
            <SearchUser />

            <div className='mt-12 grid grid-cols-1 gap-4'>
                {users && users?.map((user) => (
                    <div key={user?.id} className='flex items-center justify-between px-6 w-full h-28 rounded-xl bg-[#fff]'>
                        <div className='flex items-center gap-3'>
                            <img src={user?.photo || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} className='size-20 rounded-full object-cover' alt="" />

                            <div className='flex flex-col'>
                                <h1 className='text-lg font-semibold'>{user?.firstName} {user?.lastName}</h1>
                                <p className='text-gray-500 -mt-2 text-sm mb-1'>{user?.email}</p>
                                {user?.isAdmin && (
                                    <span className='px-3 py-1 text-xs w-auto max-w-[120px] font-semibold flex items-center justify-center rounded-full bg-amber-200 text-amber-950'>
                                        Administrador
                                    </span>
                                )}

                            </div>
                        </div>


                        <div className='flex items-center gap-6'>
                            {user?.isAdmin ? (
                                <>
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <ShieldCloseIcon data-tooltip-id="shield-close" data-tooltip-content="Remover permissão de Administrador" id='shield-close' color={colors.red[400]} size={44} className='cursor-pointer outline-none p-2.5 hover:bg-zinc-100 rounded-full' />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Remover permissão de Administrador</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tem certeza que deseja remover a permissão de Administrador de <strong>{user?.firstName} {user?.lastName}</strong>?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel asChild>
                                                    <Button variant='secondary'>Cancelar</Button>
                                                </AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button variant='danger' onClick={() => handleRemoveAdmin(user?.id)}>Confirmar</Button>

                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Tooltip id='shield-close' />

                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Trash2 data-tooltip-id="shield-close" data-tooltip-content="Excluir conta" id='shield-close' color={colors.red[700]} size={44} className='cursor-pointer outline-none p-2.5 hover:bg-zinc-100 rounded-full' />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Excluir</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tem certeza que deseja excluir a conta de <strong>{user?.firstName} {user?.lastName}</strong>?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel asChild>
                                                    <Button variant='secondary'>Cancelar</Button>
                                                </AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button variant='danger' onClick={() => handleRemoveAdmin(user?.id)}>Confirmar</Button>

                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Tooltip id='shield-close' />


                                </>
                            ) : (
                                <>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <ShieldPlus data-tooltip-id="shield-plus" data-tooltip-content="Transformar usuário em Administrador" color={colors.green[400]} size={44} className='cursor-pointer outline-none p-2.5 hover:bg-zinc-100 rounded-full' />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Adicionar permissão de Administrador</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tem certeza que deseja adicionar a permissão de Administrador para <strong>{user?.firstName} {user?.lastName}</strong>?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel asChild>
                                                    <Button variant='secondary'>Cancelar</Button>
                                                </AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button variant='primary' onClick={() => handleAddAdmin(user?.id)}>Confirmar</Button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Tooltip id='shield-plus' />

                                </>
                            )}
                            <FolderLock color={colors.green[400]} size={44} className='cursor-pointer p-2.5 hover:bg-zinc-100 rounded-full' />
                            <Pencil color={colors.yellow[600]} size={44} className='cursor-pointer p-2.5 hover:bg-zinc-100 rounded-full' />
                        </div>

                    </div>
                ))}



            </div>

        </AppLayout>
    )
}
