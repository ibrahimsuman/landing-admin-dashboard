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

  // Pie data for order status
  const pieData = [
    { name: "Success", value: 70 },
    { name: "Return", value: 20 },
    { name: "Pending", value: 10 },
  ];

  const COLORS = [
    "var(--color-primary)",   // success
    "var(--color-secondary)", // return
    "var(--color-muted)",    // pending
  ];

  return (
    <div className="flex gap-4">
      {/* 70% Chart Card */}
      <Card className="w-7/10 py-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-secondary">
            Visitors & Sales
          </CardTitle>
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
              <span className="font-medium text-secondary">{totalVisitors}</span> visitors
            </div>
            <div>
              <span className="font-medium text-secondary">${totalSales}</span> sales
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
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
        </CardContent>
      </Card>

      {/* 30% Circle Pie Card */}
      <Card className="w-3/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-secondary">Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorSalesChart;