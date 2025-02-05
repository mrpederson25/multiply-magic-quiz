import { cn } from "@/lib/utils";

interface FeedbackMessageProps {
  isCorrect: boolean;
  message: string;
  className?: string;
}

const FeedbackMessage = ({ isCorrect, message, className }: FeedbackMessageProps) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg animate-fadeIn",
        isCorrect ? "bg-successGreen/10 text-successGreen" : "bg-errorRed/10 text-errorRed",
        className
      )}
    >
      {message}
    </div>
  );
};

export default FeedbackMessage;