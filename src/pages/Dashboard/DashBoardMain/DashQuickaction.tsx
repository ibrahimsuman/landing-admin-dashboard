import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  FileText,
  ShoppingCart,
  Send,
} from "lucide-react";

const DashQuickaction = () => {
  return (
    <div className="p-4 mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <h2 className="font-semibold text-secondary dark:text-white mb-2">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button variant="outline" className="flex items-center gap-1 p-4">
          <PlusCircle size={20} />
          <span className="text-xs">Add Product</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-1 p-4">
          <ShoppingCart size={20} />
          <span className="text-xs">Manage Orders</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-1 p-4">
          <FileText size={20} />
          <span className="text-xs">View Reports</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-1 p-4">
          <Send size={20} />
          <span className="text-xs">Send Message</span>
        </Button>
      </div>
    </div>
  );
};

export default DashQuickaction;
