import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Mic } from 'lucide-react';

interface GrowerVoiceDispatchProps {
  farmerName: string;
  farmName: string;
  recordedTime: string;
  transcript: string;
  durationSeconds?: number;
}

export const GrowerVoiceDispatch: React.FC<GrowerVoiceDispatchProps> = ({
  farmerName,
  farmName,
  recordedTime,
  transcript,
  durationSeconds = 14,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 100 / (durationSeconds * 10);
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, durationSeconds]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (progress >= 100) setProgress(0);
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-[#F7F6F2] border border-[#16221A]/12 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#14281D] text-[#95FB71] flex items-center justify-center">
            <Mic className="w-3.5 h-3.5" />
          </span>
          <div>
            <span className="font-semibold text-xs text-[#16221A] block">
              Dawn Audio Dispatch
            </span>
            <span className="text-[10px] text-[#6F7F75] font-mono-nums">
              {farmerName} · {recordedTime}
            </span>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14281D] hover:bg-[#243F2F] text-white text-xs font-semibold btn-3d-primary cursor-pointer shadow-xs"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#95FB71]" /> : <Play className="w-3.5 h-3.5 text-[#95FB71] fill-[#95FB71]" />}
          <span>{isPlaying ? 'Pause' : 'Play Voice Note'}</span>
        </button>
      </div>

      {/* Animated Audio Waveform */}
      <div className="space-y-1">
        <div className="flex items-center gap-1 h-7 px-2 bg-white rounded-xl border border-[#16221A]/8 overflow-hidden">
          {Array.from({ length: 32 }).map((_, i) => {
            const heightPercent = 25 + Math.sin(i * 0.6) * 35 + (i % 3) * 15;
            const barProgress = (i / 32) * 100;
            const isPassed = barProgress <= progress;

            return (
              <div
                key={i}
                style={{
                  height: `${heightPercent}%`,
                  transition: 'height 0.15s ease',
                }}
                className={`flex-1 rounded-full transition-colors ${
                  isPassed
                    ? 'bg-[#4F9D2D]'
                    : isPlaying
                    ? 'bg-[#14281D]/30 animate-pulse'
                    : 'bg-[#16221A]/15'
                }`}
              />
            );
          })}
        </div>

        <div className="flex justify-between text-[10px] text-[#6F7F75] font-mono-nums px-1">
          <span>{isPlaying ? `${Math.round((progress / 100) * durationSeconds)}s` : '0:00'}</span>
          <span>0:{durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds}</span>
        </div>
      </div>

      {/* Transcript Text */}
      <p className="text-xs text-[#3E4F44] italic font-claude-serif leading-relaxed bg-white/70 p-2.5 rounded-xl border border-[#16221A]/5">
        "{transcript}"
      </p>
    </div>
  );
};
