"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function MainSection() {
  const { user } = useUser();
  return (
    <div className="flex flex-col text-center justify-center items-center h-[85vh]">
      <h1 className="text-3xl p-5">Your Personal AI Interview Coach</h1>
      <p className="text-2xl p-2">
        Get feedback on your interview performance from our AI coach.
      </p>
      {!user ? (
        <div className="mt-10 flex gap-5">
          <Link href="/sign-up">
            <Button className="w-fit px-10 py-7 text-lg" variant="outline">
              Get Started
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button className="w-fit px-10 py-7 text-lg" variant="outline">
              Log In
            </Button>
          </Link>
        </div>
      ) : (
        <Link href="/dashboard">
          <Button className="w-fit px-10 py-7 text-lg mt-10" variant="outline">
            Explore Dashboard
          </Button>
        </Link>
      )}
    </div>
  );
}

export default MainSection;
