import { ALL_LINES } from "@/lib/constants";
import { LineBullet } from "./LineBullet";

interface LineSelectorProps {
  onSelect: (lineId: string) => void;
}

export const LineSelector = ({ onSelect }: LineSelectorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-black">
      <h1 className="text-4xl font-bold text-white mb-12">Select a Line</h1>
      <div className="grid grid-cols-4 gap-8 max-w-4xl">
        {ALL_LINES.map((line) => (
          <button
            type="button"
            key={line.id}
            onClick={() => onSelect(line.id)}
            className="flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
          >
            <LineBullet line={line.id} size="xl" />
          </button>
        ))}
      </div>
    </div>
  );
};
