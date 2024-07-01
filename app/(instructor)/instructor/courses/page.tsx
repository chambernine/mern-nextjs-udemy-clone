import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
export default async function CoursesPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const courses = await db.course.findMany({
    where: {
      instructorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-6 py-4">
      <Link href="/instructor/create-course">
        <Button> Create New Course</Button>
        <div className="mt-10">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/instructor/courses/${course.id}/basic`}
            >
              {course.title}
            </Link>
          ))}
        </div>
      </Link>
    </div>
  );
}
