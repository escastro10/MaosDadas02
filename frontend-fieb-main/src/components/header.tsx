'use client'
import { getUserDetails } from "@/api/users/get-user-details";
import { useAuth, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { HelpCircle, Menu } from "lucide-react";
import { Teko } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, SignOut, User } from "phosphor-react";
import { toast } from "sonner";
import { AccountMenu } from "./account-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";


const teko = Teko({ subsets: ['latin'], weight: ['400'] })


const Header = () => {

    const pathname = usePathname()

    const { user } = useUser()

    const { signOut } = useAuth()



    const { data } = useQuery({
        queryKey: ['user', user?.emailAddresses[0]?.emailAddress],
        queryFn: () => getUserDetails(user?.emailAddresses[0]?.emailAddress as string)
    })

    async function handleSignOut() {
        try {
            await signOut()
            window.location.replace('/login')
        } catch {
            toast.error('Erro ao sair da conta.')
        }
    }


    return (

        <header className={clsx("h-24 w-full flex items-center justify-between bg-blue-600 px-8 md:px-16", {
            'bg-emerald-500': pathname === '/autoavaliacao',
            'bg-purple-500': pathname === '/autoavaliacao/ambiente-e-cultura',
            'bg-yellow-700': pathname === '/gerenciar-formulas',
        })}>

            <div className="flex items-center gap-6">
                <Link href={'/'} className={clsx('size-12 flex items-center justify-center p-2.5 rounded-full bg-blue-400', {
                    'bg-emerald-400': pathname === '/autoavaliacao',
                    'bg-purple-400': pathname === '/autoavaliacao/ambiente-e-cultura',
                    'bg-yellow-600': pathname === '/gerenciar-formulas',
                })}>
                    <House className="size-7 text-white" />
                </Link>
                <div className="flex flex-col">
                    <Link href={'/'}>
                        <Image src="/logo.png" alt="Logo" width={140} height={140} quality={100} />
                    </Link>
                    <p className={`${teko.className} text-zinc-100 text-xl ml-3`}>Sistema de Indicadores Sustentáveis</p>

                </div>




            </div>


            <div className="block md:hidden">
                <Sheet>
                    <SheetTrigger asChild className="p-2 rounded-lg border border-blue-500">
                        <Menu className="text-white size-10 cursor-pointer" />
                    </SheetTrigger>
                    <SheetContent>
                        <div className="sapce-y-1 mt-8">
                            <div className="flex items-center gap-4">
                                <img className="size-10 rounded-full object-cover" src={data?.photo || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} alt="" />
                                <h1 className="text-lg text-black">Olá, <strong>{user?.firstName}</strong></h1>
                            </div>

                            <div className="space-y-2">
                                <div className="p-2 w-full rounded-lg border border-blue-400 text-blue-500 mt-7 flex items-center gap-2">
                                    <User className="size-6" weight='duotone' />
                                    Minha Conta
                                </div>

                                <div className="p-2 w-full rounded-lg border border-green-400 text-green-500 mt-7 flex items-center gap-2">
                                    <HelpCircle className="size-6" />
                                    Preciso de Ajuda
                                </div>
                                <div onClick={handleSignOut} className="p-2 w-full rounded-lg border border-red-200 text-red-400 mt-7 flex items-center gap-2">
                                    <SignOut className="size-6" weight='duotone' />
                                    Sair
                                </div>
                            </div>



                        </div>
                    </SheetContent>
                </Sheet>

            </div>

            <div className="hidden md:block">
                <AccountMenu />
            </div>

            {/* <div className="flex items-center gap-4">
                <h1 className="text-lg text-white">Olá, <strong>Gabriel</strong></h1>
                <img className="size-10 rounded-full object-cover" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
            </div> */}
        </header>
    );
}

export default Header;