'use client'
import { getUserDetails } from "@/api/users/get-user-details";
import AdminMenu from "@/components/admin-menu";
import NavMenu from "@/components/nav-menu";
import AppLayout from "@/layouts/AppLayout";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { YoutubeLogo } from "phosphor-react";


export default function Page() {

  const { user } = useUser()

  const { data: me } = useQuery({
    queryKey: ['user', user?.emailAddresses[0]?.emailAddress],
    queryFn: () => getUserDetails(user?.emailAddresses[0]?.emailAddress)
  })

  return (

    <AppLayout>
      <NavMenu />

      {me?.isAdmin === true && (
        <AdminMenu />
      )}

      <Link href={`https://youtube.com`} target="_blank" className="flex items-center px-3 gap-2 mt-12 rounded-xl w-[350px] bg-red-500 h-12 hover:bg-red-700 duration-300">
        <YoutubeLogo className="size-8 text-white" />
        <h1 className="text-sm font-semibold text-white">Assista a um tutorial de uso do sistema.</h1>
      </Link>

    </AppLayout>

  )
}
