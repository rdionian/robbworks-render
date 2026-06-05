// components/music-toggle.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react"; // nice clean icons

export default function MusicToggle({
  src = "/audio/home_ambient.wav", // default file
  volume = 0.25,               // softer default volume
  position = "top-right",      // you can change placement per page
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle auto-start if user previously left it playing
  useEffect(() => {
    const wasPlaying = localStorage.getItem("musicPlaying") === "true";
    if (wasPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, []);

  // Create audio instance
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src, volume]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("musicPlaying", "false");
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
      localStorage.setItem("musicPlaying", "true");
    }
  };

  // simple helper for position
  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  return (
    <button
      onClick={toggleMusic}
      className={`fixed z-50 ${positions[position]} p-3 rounded-full bg-green-800/80 border border-green-300/40 hover:bg-green-700 transition-all duration-200 shadow-lg`}
      title={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-green-200" />
      ) : (
        <VolumeX className="w-5 h-5 text-green-200" />
      )}
    </button>
  );
}
