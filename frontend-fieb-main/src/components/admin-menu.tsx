import Link from 'next/link';
import { Database, UsersThree } from "phosphor-react";
import TitleSection from './title-section';

const adminMenuItems = [
    {
        title: "Gerenciar Permissões",
        icon: <UsersThree className="size-12" />,
        link: "/gerenciar-permissoes"
    },
    {
        title: "Gerenciar Metadados",
        icon: <Database className="size-12" />,
        link: "/gerenciar-metadados"
    }
];

const AdminMenu = () => {
    return (
        <div className="mt-12">
            <TitleSection
                title="Menu Administrativo"
                description="Gerencie as permissões e metadados do sistema."
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                {adminMenuItems.map((item, index) => (
                    <Link key={index} href={item.link} passHref>
                        <div className="flex flex-col p-4 bg-[#fff] rounded-3xl hover:bg-blue-500 cursor-pointer transition-all hover:text-white text-blue-700 items-center justify-center text-lg font-semibold h-44">
                            {item.icon}
                            {item.title}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AdminMenu;
