import React from "react";

interface ArrayVisualProps {
  num1: number;
  num2: number;
  highlightSplit?: number;
}

const ArrayVisual = ({ num1, num2, highlightSplit }: ArrayVisualProps) => {
  return (
    <div className="flex flex-col items-center gap-4 my-4">
      <div className="relative">
        {/* Row label */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
          {num1}
        </div>
        
        {/* Column labels */}
        {highlightSplit ? (
          <>
            <div className="absolute -top-8 left-0 text-purple-600 font-medium" style={{
              transform: `translateX(${(highlightSplit * 24) / 2}px)`,
            }}>
              {highlightSplit}
            </div>
            <div className="absolute -top-8 right-0 text-orange-600 font-medium" style={{
              transform: `translateX(${((num2 - highlightSplit) * 24) / 2}px)`,
            }}>
              {num2 - highlightSplit}
            </div>
          </>
        ) : (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-gray-600 font-medium">
            {num2}
          </div>
        )}
        
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
      </div>
      <p className="text-gray-600 text-sm">
        {highlightSplit ? (
          <>
            {num1} × {highlightSplit} + {num1} × {num2 - highlightSplit} = product
          </>
        ) : (
          <>
            {num1} rows × {num2} columns = product
          </>
        )}
      </p>
    </div>
  );
};

export default ArrayVisual;