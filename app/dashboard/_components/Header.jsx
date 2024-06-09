"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { GitBranchPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();
  const { user } = useUser();
  const menuClasses =
    "hover:text-primary hover:font-bold hover:scale-105 transition-all";
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
      <ul className="md:flex gap-6 hidden">
        <Link href="/dashboard">
          <li
            className={`${menuClasses} ${
              path == "/dashboard" && activeClasses
            }`}
          >
            Dashboard
          </li>
        </Link>
        <Link href="/dashboard/previous-interviews">
          <li
            className={`${menuClasses} ${
              path == "/dashboard/previous-interviews" && activeClasses
            }`}
          >
            Previous Interviews
          </li>
        </Link>
        <Link href="https://buymeacoffee.com/rudravashishtha" target="_blank">
          <li className={`hover:underline`}>Buy me a Coffee</li>
        </Link>
        {/* <li className={`${menuClasses} ${path == "/working" && activeClasses}`}>
          How it Works?
        </li> */}
      </ul>
      {!user ? (
        <div className="flex gap-5 items-center">
          <Link target="_blank" href={"https://github.com/rudravashishtha"}>
            <GitBranchPlus className="h-6 w-6" />
          </Link>
          <Link href="/sign-up">
            <Button className="w-fit" variant="outline">
              Get Started
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button className="w-fit" variant="outline">
              Log In{" "}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-10">
          <Link target="_blank" href={"https://github.com/rudravashishtha"}>
            <GitBranchPlus className="h-6 w-6" />
          </Link>
          <UserButton />
        </div>
      )}
    </div>
  );
}

export default Header;
