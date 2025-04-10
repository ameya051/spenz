"use client";
import React from "react";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import Image from "next/image";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section id="home" className="mx-auto pt-44 max-w-4xl px-4 md:px-0">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="text-5xl md:text-6xl leading-tight"
          >
            Simplify Expenses <br />
            With{" "}
            <span className="text-primary relative after:absolute after:-bottom-3  after:left-0 after:w-full after:h-6 after:bg-[url('/dual-underline.svg')] after:bg-no-repeat after:bg-contain after:animate-draw">
              Spenz.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="text-gray-600 dark:text-gray-400 text-lg max-w-lg"
          >
            We are providing easiest way to manage expenses. Get a full view so
            you know where to save. Track spending, detect fraud, and keep tabs
            on rising subscription costs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="relative justify-center"
          >
            <InteractiveHoverButton text="Get Started" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="relative aspect-square"
        >
          <Image
            src="/blake-wisz-Xn5FbEM9564-unsplash.jpg"
            alt=""
            className="rounded-2xl"
            fill
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
