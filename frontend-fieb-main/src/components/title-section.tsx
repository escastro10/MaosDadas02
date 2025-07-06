

type TitleSectionProps = {
    title: string;
    description?: string;
}

const TitleSection = ({ title, description }: TitleSectionProps) => {
    return (

        <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <span className="text-lg text-gray-500 font-medium">{description}</span>
        </div>

    );
}

export default TitleSection;