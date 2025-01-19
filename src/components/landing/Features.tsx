'use client'
import { cn } from '@/lib/utils';
import { BarChart3, Bell, PieChart, Target } from 'lucide-react'
import { motion, useInView } from "framer-motion";
import { useRef } from 'react';

export default function Features() {

  const features = [
    {
      icon: <BarChart3 className="w-10 h-10 stroke-1" />,
      title: "Smart Analytics",
      description: "Get detailed insights into your spending patterns with interactive charts and graphs."
    },
    {
      icon: <Bell className="w-10 h-10 stroke-1" />,
      title: "Smart Alerts",
      description: "Receive notifications for unusual spending, upcoming bills, and budget limits."
    },
    {
      icon: <Target className="w-10 h-10 stroke-1" />,
      title: "Goal Tracking",
      description: "Set and track your financial goals with visual progress indicators."
    },
    {
      icon: <PieChart className="w-10 h-10 stroke-1" />,
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

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -200px 0px"
  });

  return (
    <div id='features' className="max-w-4xl mx-auto px-4 pt-44">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div
            className="flex gap-4 flex-col items-center"
          >
            <motion.div
              ref={ref}
              className="flex gap-2 flex-col text-center"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.h2
                className="text-3xl md:text-5xl tracking-tighter max-w-xl"
                variants={headingVariants}
              >
                Powerful Features
              </motion.h2>
              <motion.p
                className="text-lg max-w-xl leading-relaxed tracking-tight text-muted-foreground "
                variants={paragraphVariants}
              >
                Everything you need to take control of your finances in one place.
              </motion.p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
          </div>
        </div>
      </div>
    </div>
  );
}
