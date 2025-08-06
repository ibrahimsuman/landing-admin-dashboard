import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const generateData = (days: number) => {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    data.push({
      date: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      }),
      visitors: Math.floor(Math.random() * 1000 + 200),
      sales: Math.floor(Math.random() * 500 + 100),
    });
  }

  return data;
};

const VisitorSalesChart = () => {
  const [range, setRange] = useState<1 | 7 | 30>(7);
  const chartData = generateData(range);

  const totalVisitors = chartData.reduce((sum, d) => sum + d.visitors, 0);
  const totalSales = chartData.reduce((sum, d) => sum + d.sales, 0);

  const rangeLabel = {
    1: "Today",
    7: "Last 7 Days",
    30: "Last 30 Days",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-secondary">Visitors & Sales</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              {rangeLabel[range]} <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setRange(1)}>Today</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRange(7)}>Last 7 Days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRange(30)}>Last 30 Days</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            <span className="font-medium text-secondary dark:text-white">{totalVisitors}</span> visitors
          </div>
          <div>
            <span className="font-medium text-secondary dark:text-white">${totalSales}</span> sales
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="visitors" fill="#3b82f6" name="Visitors" />
            <Bar dataKey="sales" fill="#10b981" name="Sales" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default VisitorSalesChart;
