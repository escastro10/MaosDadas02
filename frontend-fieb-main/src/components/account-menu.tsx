'use client'
import { getUserDetails } from '@/api/users/get-user-details'
import { useAuth, useUser } from '@clerk/nextjs'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { Question, SignOut, User } from 'phosphor-react'
import { toast } from 'sonner'


export function AccountMenu() {

    const { user } = useUser()

    const { data } = useQuery({
        queryKey: ['user', user?.emailAddresses[0]?.emailAddress],
        queryFn: () => getUserDetails(user?.emailAddresses[0]?.emailAddress as string)
    })

    const { signOut } = useAuth()


    async function handleSignOut() {
        try {
            await signOut()
            window.location.replace('/login')
        } catch {
            toast.error('Erro ao sair da conta.')
        }
    }


    return (
        <div className="text-right">
            <Menu>

                <MenuButton className="inline-flex items-center gap-2 rounded-md py-2 px-3 text-sm/6 font-semibold text-blue-500">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg text-white">Olá, <strong>{user?.firstName}</strong></h1>
                        <img className="size-10 rounded-full object-cover" src={data?.photo || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} alt="" />
                    </div>

                </MenuButton>
                <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-52 mt-4 origin-top-right rounded-xl border font-medium border-gray-200 bg-white px-2 py-3 text-base/6 text-blue-500 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <User className="size-6 fill-blue-500" weight='duotone' />
                            Minha Conta
                        </button>
                    </MenuItem>

                    <MenuItem>
                        <button className="group flex text-green-500 w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <Question className="size-6" weight='duotone' />
                            Preciso de Ajuda
                        </button>
                    </MenuItem>

                    <div className="my-1 h-px bg-white/5" />
                    <MenuItem>
                        <button onClick={handleSignOut} className="group flex w-full text-red-500 items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <SignOut className="size-6 fill-red-500" weight='duotone' />
                            Sair
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    )
}