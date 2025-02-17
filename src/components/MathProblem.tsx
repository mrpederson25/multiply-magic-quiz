
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FeedbackMessage from "./FeedbackMessage";
import ArrayVisual from "./ArrayVisual";
import { toast } from "@/hooks/use-toast";
import { PartyPopper } from "lucide-react";

interface MathProblemProps {
  num1: number;
  num2: number;
  type: 'multiplication' | 'division';
  onCorrectAnswer: () => void;
}

const MathProblem = ({ num1, num2, type, onCorrectAnswer }: MathProblemProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [highlightSplit, setHighlightSplit] = useState<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when the component mounts or when numbers change
  useEffect(() => {
    inputRef.current?.focus();
  }, [num1, num2, type]);

  const generateHint = (n1: number, n2: number, problemType: 'multiplication' | 'division') => {
    if (problemType === 'multiplication') {
      const half = Math.floor(n2 / 2);
      const remainder = n2 - half;
      setHighlightSplit(half);
      return `Hint: ${n1} × ${n2} = (${n1} × ${half}) + (${n1} × ${remainder})`;
    } else {
      setHighlightSplit(Math.floor(n2 / 2));
      return `Hint: ${n1} ÷ ${n2} means how many groups of ${n2} make ${n1}`;
    }
  };

  const checkAnswer = () => {
    const correctAnswer = type === 'multiplication' ? num1 * num2 : num1 / num2;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    if (isCorrect) {
      setFeedback({ isCorrect: true, message: "Correct! Moving to next problem..." });
      setHighlightSplit(undefined);
      toast({
        description: (
          <div className="flex items-center gap-2 text-successGreen animate-bounce">
            <PartyPopper className="h-5 w-5" />
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
        message: generateHint(num1, num2, type),
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      checkAnswer();
    }
  };

  // For division, we want to show the array as num1 total items divided into groups of num2
  const visualNum1 = type === 'multiplication' ? num1 : Math.ceil(num1 / num2);
  const visualNum2 = type === 'multiplication' ? num2 : num2;

  return (
    <div className="space-y-6 animate-scaleIn">
      <div className="flex flex-col items-center gap-2">
        <div className="text-6xl font-bold text-eduBlue">
          {type === 'multiplication' ? (
            <>
              {num1} × {num2} = ?
            </>
          ) : (
            <>
              {num1} ÷ {num2} = ?
            </>
          )}
        </div>
        <div className="text-2xl text-gray-600">
          {type === 'multiplication' ? (
            <>
              {num2} × {num1} = ?
            </>
          ) : (
            <>
              How many groups of {num2} make {num1}?
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ArrayVisual num1={visualNum1} num2={visualNum2} highlightSplit={highlightSplit} />
        <ArrayVisual num1={visualNum2} num2={visualNum1} highlightSplit={highlightSplit} />
      </div>

      <div className="flex gap-4 justify-center">
        <Input
          ref={inputRef}
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={handleKeyPress}
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
