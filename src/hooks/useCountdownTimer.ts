import { useState, useEffect, useCallback } from "react";
// hooks/useCountdownTimer.ts
export const useCountdownTimer = (initialSeconds = 60) => {
  const [countdown, setCountdown] = useState(initialSeconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const resetTimer = useCallback(() => {
    setCountdown(initialSeconds);
    setCanResend(false);
  }, [initialSeconds]);

  return { countdown, canResend, resetTimer };
};