import React from "react";

interface ArrayVisualProps {
  num1: number;
  num2: number;
}

const ArrayVisual = ({ num1, num2 }: ArrayVisualProps) => {
  return (
    <div className="flex flex-col items-center gap-4 my-4">
      <div className="grid gap-1" style={{ 
        gridTemplateColumns: `repeat(${num2}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${num1}, minmax(0, 1fr))` 
      }}>
        {Array.from({ length: num1 * num2 }).map((_, index) => (
          <div
            key={index}
            className="w-6 h-6 bg-eduBlue/20 border border-eduBlue/30 rounded-sm"
          />
        ))}
      </div>
      <p className="text-gray-600 text-sm">
        {num1} rows × {num2} columns = total
      </p>
    </div>
  );
};

export default ArrayVisual;