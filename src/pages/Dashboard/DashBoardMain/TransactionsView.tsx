import { useState } from "react";
import { BanknoteArrowDown, BanknoteArrowUp, CreditCard, LockKeyholeOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

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
];

export function TransactionsView() {
    const totalBalance = 5000;
    const ongoing = 8;
    const incoming = 5;

    const [showBalance, setShowBalance] = useState(false);
    const [pin, setPin] = useState("");
    const correctPin = "1234";

    const handlePinSubmit = () => {
        if (pin === correctPin) {
            setShowBalance(true);
            setPin("");
        } else {
            toast.error('Incorrect Passcode!')
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* Left Side */}
            <div className="flex flex-col gap-4 w-full lg:w-1/3">
                {/* Balance Card */}
                <Card className="w-full flex-1 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/90">
                    <CardContent className="flex justify-between items-center h-full px-4">
                        <div>
                            <p className="text-xs uppercase tracking-wide text-primary mb-2">Current Balance</p>
                            {showBalance ? (
                                <p className="text-xl font-bold">${totalBalance.toLocaleString()}</p>
                            ) : (
                                <div className="relative w-24">
                                    <input
                                        type="password"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        placeholder="1234"
                                        className="w-full pr-7 pl-2 py-1 text-xs border border-gray-300 rounded-md"
                                    />
                                    <button
                                        onClick={handlePinSubmit}
                                        className="absolute right-1 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-700 p-1"
                                    >
                                        <LockKeyholeOpen className="w-4 h-4 text-primary" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="bg-primary-500 p-2 rounded-full">
                            <CreditCard className="w-5 h-5 text-white" />
                        </div>
                    </CardContent>
                </Card>

                {/* Incoming + Ongoing */}
                <div className="flex gap-4">
                    <Card className="flex-1">
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

                    <Card className="flex-1">
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

            {/* Right Side - Transactions Table */}
            <div className="w-full lg:w-2/3">
                <Card className="w-full">
                    <CardContent className="flex flex-col">
                        <h2 className="text-md font-semibold text-gray-900 mb-4">Recent Transactions</h2>

                        <div className="overflow-x-auto rounded-xl">
                            <table className="min-w-full text-sm text-left rounded-md">
                                <thead className="bg-primary/20">
                                    <tr>
                                        <th className="px-3 py-2 font-medium text-gray-700">Name</th>
                                        <th className="px-3 py-2 font-medium text-gray-700">Category</th>
                                        <th className="px-3 py-2 font-medium text-gray-700 text-center">Date & Time</th>
                                        <th className="px-3 py-2 font-medium text-gray-700 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((txn) => (
                                        <tr key={txn.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                            <td className="px-3 py-2">{txn.name}</td>
                                            <td className="px-3 py-2">{txn.category}</td>
                                            <td className="px-3 py-2 text-center">{txn.date} {txn.time}</td>
                                            <td className={`px-3 py-2 font-semibold text-right ${txn.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                                                {txn.amount > 0 ? "+" : "-"}${Math.abs(txn.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button className="mt-2 text-primary py-1.5 px-3 rounded-md hover:bg-primary/30 cursor-pointer transition-colors text-sm self-start">
                            View All Transactions
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
