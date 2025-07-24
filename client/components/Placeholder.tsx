import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaceholderProps {
  title: string;
  description: string;
}

const Placeholder = ({ title, description }: PlaceholderProps) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Construction className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{description}</p>
        <Button
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Placeholder;
