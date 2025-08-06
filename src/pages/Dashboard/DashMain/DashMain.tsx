import {
    User,
    ShoppingCart,
    DollarSign,
    MessageCircle,
    FileText,
    PieChart,
    Calendar,
    Globe,
    Bell,
    TrendingUp,
    PackageMinus,
    Tag,
} from "lucide-react";
import DashQuickaction from "./DashQuickaction";
import VisitorSalesChart from "./VisitorSalesChart";

const stats = [
    {
        title: "Users",
        number: 1500,
        icon: <User size={28} />,
        description: "Total registered customers",
    },
    {
        title: "Orders",
        number: 320,
        icon: <ShoppingCart size={28} />,
        description: "Orders placed this month",
    },
    {
        title: "Visitors",
        number: 7650,
        icon: <Globe size={28} />,
        description: "Site visits this week",
    },
    {
        title: "Messages",
        number: 87,
        icon: <MessageCircle size={28} />,
        description: "Customer support tickets",
    },
    {
        title: "Revenue",
        number: "$12.5K",
        icon: <DollarSign size={28} />,
        description: "Gross income this month",
    },
    {
        title: "Analytics",
        number: "95%",
        icon: <PieChart size={28} />,
        description: "Site uptime and speed",
    },
    {
        title: "Sales Growth",
        number: "+12.6%",
        icon: <TrendingUp size={28} />,
        description: "Compared to last week",
    },
    {
        title: "Low Stock Items",
        number: 6,
        icon: <PackageMinus size={28} />,
        description: "Products below inventory threshold",
    },
    {
        title: "Reports",
        number: 14,
        icon: <FileText size={28} />,
        description: "Product or issue reports",
    },
    {
        title: "Events",
        number: 22,
        icon: <Calendar size={28} />,
        description: "Upcoming sales or promos",
    },
    
    {
        title: "Alerts",
        number: 5,
        icon: <Bell size={28} />,
        description: "Pending admin notifications",
    },
    {
        title: "Top Product",
        number: "Hoodie X1",
        icon: <Tag size={28} />,
        description: "Best selling this month",
    },
];

const DashMain = () => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm flex flex-col justify-between gap-2"
                    >
                        <div className="flex items-center justify-between ">
                            <h2 className="text-sm font-medium text-secondary dark:text-gray-400">
                                {stat.title}
                            </h2>
                            <div className="text-gray-700 dark:text-gray-200">{stat.icon}</div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.number}
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
                    </div>
                ))}
            </div>
            <DashQuickaction />
            <div className="my-8">
                <VisitorSalesChart />
            </div>

        </>
    );
};

export default DashMain;
