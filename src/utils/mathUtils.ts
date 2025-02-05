export const generateProblem = () => {
  const num1 = Math.floor(Math.random() * 9) + 1;
  const num2 = Math.floor(Math.random() * 9) + 1;
  return {
    num1,
    num2,
    answer: num1 * num2,
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