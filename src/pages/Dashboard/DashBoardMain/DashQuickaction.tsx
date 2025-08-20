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
        {[
          { icon: <PlusCircle size={20} />, label: "Add Product" },
          { icon: <ShoppingCart size={20} />, label: "Manage Orders" },
          { icon: <FileText size={20} />, label: "View Reports" },
          { icon: <Send size={20} />, label: "Send Message" },
        ].map((btn, index) => (
          <Button
            key={index}
            variant="outline"
            className="relative overflow-hidden group flex items-center gap-1 p-4"
          >
            {/* Ripple effect */}
            <span className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></span>

            {/* Button content */}
            <span className="relative z-10">{btn.icon}</span>
            <span className="text-xs relative z-10">{btn.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DashQuickaction;
