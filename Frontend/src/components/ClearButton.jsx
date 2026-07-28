import { Trash2 } from "lucide-react";

const ClearButton = ({ handleClear }) => {
  return (
    <div className="flex justify-center mt-8">

      <button
        onClick={handleClear}
        className="flex items-center gap-2
        px-6 py-3
        border border-zinc-700
        rounded-lg
        text-zinc-300
        hover:text-red-400
        hover:border-red-500
        hover:bg-red-500/10
        transition-all duration-300"
      >
        <Trash2 size={18} />

        Reset

      </button>

    </div>
  );
};

export default ClearButton;