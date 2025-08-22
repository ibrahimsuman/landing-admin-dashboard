import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
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
      date: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
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

  const rangeLabel = { 1: "Today", 7: "Last 7 Days", 30: "Last 30 Days" };

  const pieData = [
    { name: "Success", value: 70 },
    { name: "Return", value: 20 },
    { name: "Pending", value: 10 },
  ];

  const COLORS = [
    "var(--color-primary)",
    "var(--color-secondary)",
    "var(--color-muted)",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <Card className="w-full lg:w-[70%] min-w-0 py-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-secondary">
            Visitors & Sales
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-muted-foreground gap-2">
            <div>
              <span className="font-medium text-secondary">{totalVisitors}</span> visitors
            </div>
            <div>
              <span className="font-medium text-secondary">${totalSales}</span> sales
            </div>
          </div>

          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visitors" fill="var(--color-primary)" name="Visitors" />
                <Bar dataKey="sales" fill="var(--color-secondary)" name="Sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full lg:w-[30%] min-w-0 py-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-secondary">
            Order Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  nameKey="name"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>

  );
};

export default VisitorSalesChart;
