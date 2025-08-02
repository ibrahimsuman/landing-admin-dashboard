import React, { useEffect, useState } from "react";

// Static mock data
const mockReportData = [
  {
    productId: "P001",
    productName: "Tomato Seeds",
    description: "High-yield hybrid tomato seeds.",
    customer: "Alice Johnson",
    purchases: 4,
  },
  {
    productId: "P002",
    productName: "Organic Fertilizer",
    description: "All-natural compost fertilizer.",
    customer: "Bob Smith",
    purchases: 2,
  },
  {
    productId: "P003",
    productName: "Garden Tools Set",
    description: "Includes trowel, pruner, and gloves.",
    customer: "Clara Lee",
    purchases: 1,
  },
];

const Report = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setReportData(mockReportData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm min-h-[calc(100vh-4rem)]">
      <h1 className="text-xl font-semibold mb-4">Customer Report by Product</h1>

      <div className="overflow-auto">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 text-xs font-medium uppercase">
            <tr>
              <th className="p-2 border">Product ID</th>
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Purchases</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border">{item.productId}</td>
                <td className="p-2 border">{item.productName}</td>
                <td className="p-2 border">{item.description}</td>
                <td className="p-2 border">{item.customer}</td>
                <td className="p-2 border">{item.purchases}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {reportData.length === 0 && (
          <p className="text-gray-500 mt-4">No report data available.</p>
        )}
      </div>
    </div>
  );
};

export default Report;
