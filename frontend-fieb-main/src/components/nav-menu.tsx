import Link from 'next/link';
import { ChartBar, Gauge, MagnifyingGlass } from "phosphor-react";
import TitleSection from './title-section';

const menuItems = [
    {
        title: "Dashboard",
        icon: <Gauge className="size-12" />,
        link: "/dashboard"
    },
    {
        title: "Indicadores Sustentáveis",
        icon: <ChartBar className="size-12" />,
        link: "/indicadores-sustentaveis"
    },
    {
        title: "Autoavaliação",
        icon: <MagnifyingGlass className="size-12" />,
        link: "/autoavaliacao"
    }
];

const NavMenu = () => {
    return (
        <div>
            <TitleSection
                title='Menu'
                description='Navegue pelas funcionalidades do sistema.'
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                {menuItems.map((item, index) => (
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

export default NavMenu;
