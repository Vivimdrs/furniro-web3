import clsx from "clsx"
import BenefitItem from "../BenefitItem"

const benefits = [
    {
        icon: "/Icons/trophy.svg",
        title: "High Quality",
        description: "crafted from top materials",
    },
    {
        icon: "/Icons/warranty.svg",
        title: "Warranty Protection",
        description: "Over 2 years",
    },
    {
        icon: "/Icons/shipping.svg",
        title: "Free Shipping",
        description: "Order over 150 $",
    },
    {
        icon: "/Icons/support.svg",
        title: "24 / 7 Support",
        description: "Dedicated support",
    },
]

const BenefitsCard = () => {
    return (
        <div
            className={clsx(
            "w-full h-67.5",
            "bg-[#F9F1E7]",
            "flex items-center justify-center",
            )}
        >
            <div
            className={clsx(
                "w-full max-w-7xl h-17.5",
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                "gap-8 items-center"
            )}
            >
            {benefits.map((benefit) => (
                <BenefitItem
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                />
            ))}
            </div>
        </div>
    )
}

export default BenefitsCard