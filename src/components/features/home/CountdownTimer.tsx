import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  endTime?: Date;
  title?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endTime = new Date(Date.now() + 24 * 60 * 60 * 1000),
  title = 'Kết thúc trong',
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = endTime.getTime() - now.getTime();

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-red-600 text-white rounded-md p-2 sm:p-3 min-w-12 sm:min-w-16 flex items-center justify-center">
        <span className="text-lg sm:text-2xl font-bold">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs sm:text-sm font-medium text-gray-600 mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
        <span className="text-sm sm:text-base font-semibold text-gray-800">
          {title}
        </span>
      </div>

      <div className="flex gap-1 sm:gap-3 items-center">
        <TimeUnit value={timeRemaining.days} label="Ngày" />
        <span className="text-xl sm:text-3xl font-bold text-gray-400">:</span>
        <TimeUnit value={timeRemaining.hours} label="Giờ" />
        <span className="text-xl sm:text-3xl font-bold text-gray-400">:</span>
        <TimeUnit value={timeRemaining.minutes} label="Phút" />
        <span className="text-xl sm:text-3xl font-bold text-gray-400">:</span>
        <TimeUnit value={timeRemaining.seconds} label="Giây" />
      </div>
    </div>
  );
};

export default CountdownTimer;