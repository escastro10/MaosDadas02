import clsx from "clsx";
import { ComponentIcon } from "lucide-react";
import { Factory, FlowerLotus, Headset, UsersThree } from "phosphor-react";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { PiChalkboardTeacherBold } from "react-icons/pi";


type AreaItemProps = {
    id: string;
    name: string;
    slug: string;
    period: {
        id: string;
        year: number;
    }
}

type Data = {
    data: AreaItemProps;
    selected?: string;
    onClick?: () => void;
}

const AreaCategory = ({ data, selected, onClick }: Data) => {
    const getAreaIcon = (areaName: string) => {
        switch (areaName) {
            case "ambiental":
                return <FlowerLotus className="size-8" />;
            case "atendimento-a-clientes":
                return <Headset className="size-8" />;
            case "atendimento-as-industrias":
                return <Factory className="size-8" />;
            case "comunidades":
                return <UsersThree className="size-8" weight="fill" />;
            case "conselhos-tematicos":
                return <PiChalkboardTeacherBold className="size-8" />;
            case "defesa-de-interesses":
                return <ComponentIcon className="size-8" />;
            case "desempenho-economico":
                return <FaFileInvoiceDollar className="size-8" />

        }
    };

    const icon = getAreaIcon(data.slug);

    return (
        <div onClick={onClick} className={clsx("bg-[#fff] cursor-pointer  transition-all hover:scale-[101%] rounded-2xl gap-2 items-center text-center justify-center h-36 p-4 flex flex-col text-sm font-semibold",

            {

                'bg-green-700 text-white': selected === data.id,
                'hover:bg-green-100 hover:text-green-500': selected !== data.id,
                'text-green-800': selected !== data.id

            }

        )}>
            {icon}
            {data.name}
        </div>
    );
}

export default AreaCategory;