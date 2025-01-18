'use client'
import { cn } from '@/lib/utils';
import { BarChart3, Bell, PieChart, Target } from 'lucide-react'
import { motion, useInView } from "framer-motion";
import { useRef } from 'react';

export default function Features() {

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 stroke-1" />,
      title: "Smart Analytics",
      description: "Get detailed insights into your spending patterns with interactive charts and graphs."
    },
    {
      icon: <Bell className="w-8 h-8 stroke-1" />,
      title: "Smart Alerts",
      description: "Receive notifications for unusual spending, upcoming bills, and budget limits."
    },
    {
      icon: <Target className="w-8 h-8 stroke-1" />,
      title: "Goal Tracking",
      description: "Set and track your financial goals with visual progress indicators."
    },
    {
      icon: <PieChart className="w-8 h-8 stroke-1" />,
      title: "Budget Categories",
      description: "Organize expenses with custom categories and tags for better tracking."
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.6
      }
    }
  };

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -200px 0px"
  });

  return (
    <div id='features' className="max-w-4xl mx-auto">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div
            className="flex gap-4 flex-col items-start"
          >
            <motion.div
              ref={ref}
              className="flex gap-2 flex-col"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.h2
                className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left"
                variants={headingVariants}
              >
                Powerful Features
              </motion.h2>
              <motion.p
                className="text-lg max-w-xl leading-relaxed tracking-tight text-muted-foreground text-left"
                variants={paragraphVariants}
              >
                Everything you need to take control of your finances in one place.
              </motion.p>
            </motion.div>
          </div>
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {
              features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "cursor-pointer bg-muted rounded-md aspect-square p-6 flex justify-between flex-col",
                    "transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-sm",
                    (index === 1 || index === 2) && "lg:aspect-auto h-full lg:col-span-2"
                  )}
                >
                  {feature.icon}
                  <div className="flex flex-col">
                    <h3 className="text-xl tracking-tight">{feature.title}</h3>
                    <p className="text-muted-foreground max-w-xs text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))
            }
          </motion.div>
        </div>
      </div>
    </div>
  );
}
