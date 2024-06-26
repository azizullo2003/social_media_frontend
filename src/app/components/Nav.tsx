"use client";
import React from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Nav() {
  const { user, isLoaded } = useUser();
  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-l-0 border-r-0 border-b-gray-600"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/posts" className="-m-1.5 p-1.5">
            Posts
          </a>
        </div>
        {isLoaded && user && (
          <>
            <div className="">
              <a href="/add_post">+</a>
            </div>
            <UserButton afterSignOutUrl="/"></UserButton>
          </>
        )}
      </nav>
    </header>
  );
}
