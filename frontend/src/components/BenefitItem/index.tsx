type BenefitItemProps = {
    icon: string
    title: string
    description: string
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => {
    return (
        <div className="flex items-center gap-2.5">
            <img src={icon} alt={title} className="w-16 h-16" />
            <div className="flex flex-col">
            <span className="font-poppins font-semibold text-[20px] text-black">
                {title}
            </span>
            <span className="font-poppins font-medium text-[16px] text-[#898989]">
                {description}
            </span>
            </div>
        </div>
    )
}

export default BenefitItem