export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const calculateGameCountdown = (targetDate: string | Date): CountdownTime => {
  const currentDate = new Date();
  const gameDate = new Date(targetDate);

  const timeRemaining = gameDate.getTime() - currentDate.getTime();

  if (timeRemaining <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true
    };
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false
  };
};
