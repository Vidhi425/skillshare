"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const words = ["Learn", "Create", "Inspire"];

const AnimatedHeadline = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        setText((prev) => prev.slice(0, -1));
        setSpeed(50);
      } else {
        setText((prev) => words[index].slice(0, prev.length + 1));
        setSpeed(100);
      }

      if (!isDeleting && text === words[index]) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingInterval = setTimeout(handleTyping, speed);
    return () => clearTimeout(typingInterval);
  }, [text, isDeleting, index]);

  return (
    <div className={`flex flex-col text-black text-wrap ${spaceGrotesk.className}`}>
      <h1 className="text-6xl font-bold">
        <span>{text}</span>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      </h1>
      <p className="text-2xl mt-4">
        The Ultimate Skill-Sharing Hub
      </p>

      <p className="text-xl text-gray-500 mt-10">
        Discover a world of knowledge with top mentors. Gain hands-on experience, collaborate with experts, and master new skills at your own pace.
      </p>

      <div>
      <Link href="/mentor-search">
        <motion.button
          className="bg-black text-white px-8 py-4 text-lg mt-4 rounded-2xl transition duration-50"
          whileHover={{ scale: 1.1 }} 
        >
          Search Your Mentor
        </motion.button>
      </Link>
      </div>
    </div>
  );
};

export default AnimatedHeadline;
