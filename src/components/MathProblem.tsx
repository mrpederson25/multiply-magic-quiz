import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FeedbackMessage from "./FeedbackMessage";
import ArrayVisual from "./ArrayVisual";
import { toast } from "@/hooks/use-toast";
import { Party } from "lucide-react";

interface MathProblemProps {
  num1: number;
  num2: number;
  onCorrectAnswer: () => void;
}

const MathProblem = ({ num1, num2, onCorrectAnswer }: MathProblemProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const checkAnswer = () => {
    const correctAnswer = num1 * num2;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    if (isCorrect) {
      setFeedback({ isCorrect: true, message: "Correct! Moving to next problem..." });
      toast({
        description: (
          <div className="flex items-center gap-2 text-successGreen animate-bounce">
            <Party className="h-5 w-5" />
            <span className="font-bold text-lg">Amazing job! You got it right! 🎉</span>
          </div>
        ),
        className: "bg-successGreen/10 border-successGreen text-successGreen",
      });
      setTimeout(() => {
        setUserAnswer("");
        setFeedback(null);
        onCorrectAnswer();
      }, 1500);
    } else {
      setFeedback({
        isCorrect: false,
        message: `Not quite. ${num1} × ${num2} = ${correctAnswer}. Let's try again!`,
      });
    }
  };

  return (
    <div className="space-y-6 animate-scaleIn">
      <div className="flex flex-col items-center gap-2">
        <div className="text-6xl font-bold text-eduBlue">
          {num1} × {num2} = ?
        </div>
        <div className="text-2xl text-gray-600">
          {num2} × {num1} = ?
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ArrayVisual num1={num1} num2={num2} />
        <ArrayVisual num1={num2} num2={num1} />
      </div>

      <div className="flex gap-4 justify-center">
        <Input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="text-2xl w-32 text-center"
          placeholder="?"
        />
        <Button onClick={checkAnswer} className="bg-eduBlue hover:bg-eduBlue/90 text-xl px-8">
          Check
        </Button>
      </div>

      {feedback && (
        <FeedbackMessage isCorrect={feedback.isCorrect} message={feedback.message} />
      )}
    </div>
  );
};

export default MathProblem;