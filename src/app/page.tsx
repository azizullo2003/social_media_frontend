"use client";
import Layout from "./layout";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const Home = () => {
 
  const { userId } = auth();
  if (userId) {
    redirect("/posts");
  }
  return <h1 className="text-4xl font-bold text-center">Social Media</h1>;
};

export default Home;
