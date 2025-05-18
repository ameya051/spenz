"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import Link from "next/link";
import Logo from "../logo";
import { useAuth } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

function Navigation() {
  const { isSignedIn, isLoaded } = useAuth();

  const navLinks = [
    { href: "#home", name: "Home" },
    { href: "#features", name: "Features" },
    { href: "#testimonials", name: "Testimonials" },
  ];
  
  return (
    <nav className="fixed top-0 w-full z-50 border-b backdrop-blur-md bg-white/70 dark:bg-gray-900 dark:bg-opacity-60 border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-1">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="hover:text-primary dark:hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {isLoaded && (
              isSignedIn ? (
                <Button
                  variant="default"
                  className="bg-primary text-white"
                >
                  <Link href="/dashboard">Start Saving</Link>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="text-primary"
                >
                  <Link href="/sign-in">Log In →</Link>
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
