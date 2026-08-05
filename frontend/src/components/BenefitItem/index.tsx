type BenefitItemProps = {
    icon: string
    title: string
    description: string
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => {
    return (
        <div className="flex items-center gap-2.5">
            <img src={icon} alt="" className="h-[60px] w-[60px] shrink-0" />
            <div className="flex flex-col">
            <span className="font-poppins font-semibold text-[25px] leading-[1.5] text-[#242424] whitespace-nowrap">
                {title}
            </span>
            <span className="font-poppins font-medium text-[20px] leading-[1.5] text-[#898989] whitespace-nowrap">
                {description}
            </span>
            </div>
        </div>
    )
}

export default BenefitItem
