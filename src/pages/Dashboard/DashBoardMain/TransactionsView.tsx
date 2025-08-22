import { BanknoteArrowDown, CreditCard, BanknoteArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Transaction = {
    id: string;
    name: string;
    category: string;
    amount: number;
    date: string;
    time: string;
};

const transactions: Transaction[] = [
    { id: "1", name: "Payment from John", category: "Income", amount: 250, date: "2025-08-19", time: "10:30 AM" },
    { id: "2", name: "Shopify Purchase", category: "Expense", amount: -120, date: "2025-08-18", time: "2:15 PM" },
    { id: "3", name: "Refund from Amazon", category: "Income", amount: 75, date: "2025-08-17", time: "11:45 AM" },
    { id: "4", name: "Netflix Subscription", category: "Expense", amount: -15, date: "2025-08-16", time: "9:00 PM" },
    { id: "4", name: "Netflix Subscription", category: "Expense", amount: -15, date: "2025-08-16", time: "9:00 PM" },
    { id: "4", name: "Netflix Subscription", category: "Expense", amount: -15, date: "2025-08-16", time: "9:00 PM" },
    { id: "4", name: "Netflix ", category: "Expense", amount: -15, date: "2025-08-16", time: "9:00 PM" },
    { id: "4", name: "Netflix Subscription", category: "Expense", amount: -15, date: "2025-08-16", time: "9:00 PM" },
    { id: "4", name: "Netflix Subscription", category: "Expense", amount: -15, date: "2025-08-16", time: "9:00 PM" },
    { id: "4", name: "Netflix Subscription", category: "Expense", amount: -15, date: "2025-08-16", time: "9:00 PM" },
    { id: "4", name: "Netflix Subscription", category: "Expense", amount: -15, date: "2025-08-16", time: "9:00 PM" },
    { id: "4", name: "Netflix Subscription", category: "Expense", amount: -15, date: "2025-08-22", time: "9:55 PM" },
];

export function TransactionsView() {
    const totalBalance = 5000;
    const ongoing = 8;
    const incoming = 5;

    return (
        <div className="flex flex-col lg:flex-row gap-4 w-full max-w-full mx-auto">
            <div className="flex flex-col gap-4 w-full lg:w-1/3">
                {/* Balance Card */}
                <Card className="w-full lg:h-full flex-1 rounded-xl overflow-hidden bg-gradient-to-r from-primary/10 to-primary/100">
                    <CardContent className="flex justify-between items-center h-full px-4 ">
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500">Current Balance</p>
                            <p className="text-xl font-bold">${totalBalance.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-2 rounded-full shadow">
                            <CreditCard className="w-5 h-5 text-primary" />
                        </div>
                    </CardContent>
                </Card>

                {/* Incoming + Ongoing Cards */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Card className="w-full min-h-[100px] flex-1 rounded-xl">
                        <CardContent className="flex justify-between items-center h-full px-3">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-green-500">Incoming</p>
                                <p className="text-lg font-bold">${incoming}.00</p>
                            </div>
                            <div className="p-2 rounded-full bg-green-200">
                                <BanknoteArrowDown className="w-4 h-4 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="w-full min-h-[100px] flex-1 rounded-xl">
                        <CardContent className="flex justify-between items-center h-full px-3">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-red-500">Ongoing</p>
                                <p className="text-lg font-bold">${ongoing}.00</p>
                            </div>
                            <div className="p-2 rounded-full bg-red-200">
                                <BanknoteArrowUp className="w-4 h-4 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="w-full lg:w-2/3">
                <Card className="w-full h-full rounded-xl">
                    <CardContent className="flex flex-col h-full">
                        <h2 className="text-md font-semibold text-gray-900 mb-2">Recent Transactions</h2>

                        <div className="overflow-x-auto flex-1">
                            <table className="min-w-full text-sm text-left rounded-md">
                                <thead className="bg-primary/20">
                                    <tr>
                                        <th className="px-3 py-2 font-medium text-gray-700">Name</th>
                                        <th className="px-3 py-2 font-medium text-gray-700">Category</th>
                                        <th className="px-3 py-2 font-medium text-gray-700">Date & Time</th>
                                        <th className="px-3 py-2 font-medium text-gray-700 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...transactions]
                                        .sort((a, b) => {
                                            const dateA = new Date(`${a.date} ${a.time}`);
                                            const dateB = new Date(`${b.date} ${b.time}`);
                                            return dateB.getTime() - dateA.getTime(); // latest first
                                        })
                                        .slice(0, 5)
                                        .map((txn) => {
                                            const formattedDate = new Date(
                                                `${txn.date} ${txn.time}`
                                            ).toLocaleString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true,
                                            });

                                            return (
                                                <tr
                                                    key={txn.id}
                                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-3 py-2">{txn.name}</td>
                                                    <td className="px-3 py-2">{txn.category}</td>
                                                    <td className="px-3 py-2">{formattedDate}</td>
                                                    <td
                                                        className={`px-3 py-2 font-semibold text-right ${txn.amount > 0 ? "text-green-500" : "text-red-500"
                                                            }`}
                                                    >
                                                        {txn.amount > 0 ? "+" : "-"}${Math.abs(txn.amount)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>

                        <button className="mt-2 text-primary py-1.5 px-3 rounded-md hover:bg-primary/80 transition-colors text-sm self-start">
                            View All Transactions
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
}

