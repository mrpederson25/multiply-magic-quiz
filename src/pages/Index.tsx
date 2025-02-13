
import { useState } from "react";
import MathProblem from "@/components/MathProblem";
import { generateProblem, getEncouragement } from "@/utils/mathUtils";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [problem, setProblem] = useState(generateProblem());
  const [score, setScore] = useState(0);

  const handleCorrectAnswer = () => {
    setScore((prev) => prev + 1);
    setProblem(generateProblem());
    toast({
      description: getEncouragement(),
      className: "bg-successGreen/10 text-successGreen border-none",
    });
  };

  return (
    <div className="min-h-screen bg-softBackground flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Math Practice</h1>
            <p className="text-gray-600">Master multiplication and division!</p>
          </div>
          
          <div className="text-right">
            <span className="text-eduBlue font-semibold">
              Score: {score}
            </span>
          </div>

          <MathProblem
            num1={problem.num1}
            num2={problem.num2}
            type={problem.type}
            onCorrectAnswer={handleCorrectAnswer}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
