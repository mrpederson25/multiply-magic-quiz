
export const generateProblem = () => {
  const num1 = Math.floor(Math.random() * 9) + 1;
  const num2 = Math.floor(Math.random() * 9) + 1;
  const isMultiplication = Math.random() < 0.5;

  // For division, we'll use the product as the first number to ensure whole number answers
  return isMultiplication ? {
    num1,
    num2,
    answer: num1 * num2,
    type: 'multiplication' as const
  } : {
    num1: num1 * num2, // dividend
    num2: num1, // divisor
    answer: num2,
    type: 'division' as const
  };
};

export const getEncouragement = () => {
  const phrases = [
    "Great job! 🌟",
    "Excellent work! 🎉",
    "You're doing great! 💫",
    "Keep it up! 🚀",
    "Fantastic! ⭐",
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
};
