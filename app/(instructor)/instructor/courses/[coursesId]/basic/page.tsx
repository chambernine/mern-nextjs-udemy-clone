import EditCourseForm from "@/components/courses/EditCourseForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function CourseBasics({
  params,
}: {
  params: { coursesId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.coursesId,
      instructorId: userId,
    },
  });

  if (!course) {
    redirect("/instructor/courses");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: true,
    },
  });

  const levels = await db.level.findMany();

  return (
    <div className="px-10">
      <EditCourseForm
        course={course}
        categories={categories.map((category) => ({
          label: category.name,
          value: category.id,
          subCategories: category.subCategories.map((subCategory) => ({
            label: subCategory.name,
            value: subCategory.id,
          })),
        }))}
        levels={levels.map((level) => ({
          label: level.name,
          value: level.id,
        }))}
      />
    </div>
  );
}
