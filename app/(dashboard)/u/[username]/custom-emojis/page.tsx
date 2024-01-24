"use client";

import { getAllCategories } from "@/action/emoji";
import { useEffect } from "react";

const CustomEmojis = () => {
  const getCategory = async () => {
    const x = await getAllCategories();
    console.log(x, "==========================");
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Add your personalized emojis</h1>
      <div className="gap-10 lg:grid lg:grid-cols-2"></div>
    </div>
  );
};

export default CustomEmojis;
