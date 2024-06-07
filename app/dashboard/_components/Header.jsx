"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const path = usePathname();
  const menuClasses =
    "hover:text-primary hover:font-bold hover:scale-105 transition-all cursor-pointer";
  const activeClasses = "text-primary font-bold";
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <div className="flex items-center">
        <Image
          src={"/logo.svg"}
          alt="ProtoMock"
          width={64}
          height={64}
          className="p-2"
        />
        <h1 className="text-xl font-bold text-[#30bac9]">ProtoMock</h1>
      </div>
      <ul className="md:flex gap-6 ml-[-3rem] hidden">
        <li
          className={`${menuClasses} ${path == "/dashboard" && activeClasses}`}
        >
          Dashboard
        </li>
        <li
          className={`${menuClasses} ${path == "/questions" && activeClasses}`}
        >
          Questions
        </li>
        <li className={`${menuClasses} ${path == "/upgrade" && activeClasses}`}>
          Upgrade
        </li>
        <li className={`${menuClasses} ${path == "/working" && activeClasses}`}>
          How it Works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
