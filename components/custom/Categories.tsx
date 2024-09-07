"use client";
import { Category } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
}

export default function Categories({
  categories,
  selectedCategory,
}: CategoriesProps) {
  const router = useRouter();

  const onclick = (categoryId: string | null) => {
    router.push(categoryId ? `/categories/${categoryId}` : "/");
  };

  return (
    <div className="flex flex-wrap px-4 gap-7 justify-center my-10">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onclick(null)}
      >
        All Categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onclick(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
