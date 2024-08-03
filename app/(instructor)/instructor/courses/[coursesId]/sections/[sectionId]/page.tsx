import EditSectionForm from "@/components/sections/EditSectionForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function SectionDetailsPage({
  params,
}: {
  params: { coursesId: string; sectionId: string };
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
    return redirect("/instructor/courses");
  }

  const section = await db.section.findUnique({
    where: {
      id: params.sectionId,
      courseId: params.coursesId,
    },
    include: {
      resources: true,
      muxData: true,
    },
  });

  if (!section) {
    return redirect(`/instructor/courses${params.coursesId}/sections`);
  }

  const isCompleted = false;
  return (
    <div className="px-10">
      <EditSectionForm
        section={section}
        courseId={params.coursesId}
        isCompleted={isCompleted}
      />
    </div>
  );
}
