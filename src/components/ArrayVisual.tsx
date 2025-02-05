import React from "react";

interface ArrayVisualProps {
  num1: number;
  num2: number;
  highlightSplit?: number; // The point where we split the visualization
}

const ArrayVisual = ({ num1, num2, highlightSplit }: ArrayVisualProps) => {
  return (
    <div className="flex flex-col items-center gap-4 my-4">
      <div className="grid gap-1" style={{ 
        gridTemplateColumns: `repeat(${num2}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${num1}, minmax(0, 1fr))` 
      }}>
        {Array.from({ length: num1 * num2 }).map((_, index) => {
          const column = index % num2;
          const isFirstPart = highlightSplit ? column < highlightSplit : true;
          
          return (
            <div
              key={index}
              className={`w-6 h-6 border rounded-sm transition-colors duration-300 ${
                !highlightSplit
                  ? "bg-eduBlue/20 border-eduBlue/30"
                  : isFirstPart
                  ? "bg-purple-200 border-purple-300"
                  : "bg-orange-200 border-orange-300"
              }`}
            />
          );
        })}
      </div>
      <p className="text-gray-600 text-sm">
        {num1} rows × {num2} columns = product
      </p>
    </div>
  );
};

export default ArrayVisual;