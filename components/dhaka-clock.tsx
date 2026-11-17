'use client';

import React, { useEffect, useState } from 'react';
import { profile } from '@/data/profile';

export function DhakaClock() {
  const [timeStr, setTimeStr] = useState<string>('--:--:--');

  useEffect(() => {
    const formatDhakaTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr('12:00:00');
      }
    };

    formatDhakaTime();
    const timer = setInterval(formatDhakaTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-mono text-xs tabular-nums text-muted-foreground">
      {profile.coordinates} · Dhaka {timeStr} ({profile.timezone})
    </span>
  );
}
