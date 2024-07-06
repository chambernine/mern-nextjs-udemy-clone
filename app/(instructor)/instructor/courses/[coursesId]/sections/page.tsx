import CreateSectionForm from "@/components/sections/CreateSectionForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function CourseCurriculumPage({
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
    include: {
      sections: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    redirect("/instructor/courses");
  }

  return <CreateSectionForm course={course} />;
}
