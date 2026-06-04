"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Loader2, Volume2 } from "lucide-react";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/cn";
import { business } from "@/lib/business";
import type { Dictionary } from "@/lib/i18n/types";

type Props = {
  t: Dictionary["liveBadge"];
  variant?: "hero" | "fab" | "inline";
  location: string;
};

type State = "idle" | "loading" | "playing" | "error";

export function LivePlayer({ t, variant = "hero", location }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<State>("idle");
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  function toggle() {
    if (!audioRef.current) {
      const audio = new Audio(business.stream.url);
      audio.preload = "none";
      audio.volume = volume;
      audio.addEventListener("playing", () => setState("playing"));
      audio.addEventListener("pause", () => setState("idle"));
      audio.addEventListener("waiting", () => setState("loading"));
      audio.addEventListener("error", () => setState("error"));
      audioRef.current = audio;
    }
    const audio = audioRef.current;
    if (state === "playing") {
      audio.pause();
      setState("idle");
    } else {
      setState("loading");
      track("listen_live_click", { location, variant });
      audio.play().catch(() => setState("error"));
    }
  }

  const isPlaying = state === "playing";
  const isLoading = state === "loading";

  if (variant === "fab") {
    return (
      <button
        onClick={toggle}
        aria-label={isPlaying ? t.pause : t.listenNow}
        className={cn(
          "fixed bottom-4 right-4 z-40 flex items-center gap-3 rounded-full shadow-xl shadow-brand-500/30",
          "bg-brand-500 text-ink-950 px-5 h-14 font-semibold",
          "hover:bg-brand-400 active:scale-95 transition-all duration-200",
          "focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2"
        )}
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-ink-950 text-brand-400">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </span>
        <span className="hidden sm:inline">
          {isPlaying ? t.listening : t.listenNow} · 99.6
        </span>
        {isPlaying && <span className="pulse-dot" aria-hidden="true" />}
      </button>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-3 rounded-full border border-ink-200 bg-white p-1 pr-4 shadow-sm">
        <button
          onClick={toggle}
          aria-label={isPlaying ? t.pause : t.listenNow}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-ink-950 hover:bg-brand-400 transition-colors"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>
        <span className="text-sm font-semibold">{isPlaying ? t.listening : t.listenNow}</span>
        {isPlaying && <span className="pulse-dot" aria-hidden="true" />}
      </div>
    );
  }

  // Hero variant — large player card
  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="pulse-dot" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
            {t.onAir}
          </span>
        </div>
        <span className="text-xs font-semibold text-white/60">99.6 FM</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          aria-label={isPlaying ? t.pause : t.listenNow}
          className={cn(
            "group flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-500 text-ink-950 shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-400 hover:scale-105 active:scale-95"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-7 w-7 animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-7 w-7" />
          ) : (
            <Play className="h-7 w-7 ml-1" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold leading-tight text-white">
            Barca FM
          </p>
          <p className="text-sm text-white/70">
            {isLoading ? t.loading : isPlaying ? t.listening : t.listenNow}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Volume2 className="h-4 w-4 text-white/60" aria-hidden="true" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          aria-label="Volume"
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-brand-500"
        />
      </div>
    </div>
  );
}
