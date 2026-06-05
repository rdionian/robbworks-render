"use client";
import { motion } from "framer-motion";

export default function LogbookPage({ entry, onImageClick }) {
  return (
    <motion.div
      className="w-full flex justify-center items-stretch gap-6 bg-[#f8f9f4] text-[#1a1a1a] rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left page (Images) */}
      <div className="flex-1 flex flex-col items-center gap-4">
        {entry.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={entry.title}
            onClick={() => onImageClick(img)}
            className="w-[80%] cursor-pointer rounded-md border border-gray-300 hover:scale-105 transition-transform duration-200"
          />
        ))}
      </div>

      {/* Right page (Text) */}
      <div className="flex-1 flex flex-col justify-center text-left">
        <h2 className="text-2xl font-bold mb-2">{entry.title}</h2>
        <p className="text-sm text-gray-600 mb-4">{entry.date}</p>
        <p className="text-lg leading-relaxed whitespace-pre-line">
          {entry.text}
        </p>
      </div>
    </motion.div>
  );
}

