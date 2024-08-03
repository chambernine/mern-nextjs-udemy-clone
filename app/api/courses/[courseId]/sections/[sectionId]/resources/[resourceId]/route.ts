import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  {
    params,
  }: { params: { courseId: string; sectionId: string; resourceId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseId, sectionId, resourceId } = params;
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        instructorId: userId,
      },
    });
    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        courseId: course.id,
      },
    });
    if (!section) {
      return new NextResponse("Section Not Found", { status: 404 });
    }

    await db.resource.delete({
      where: {
        id: resourceId,
        sectionId,
      },
    });

    return NextResponse.json("Resource Deleted", { status: 200 });
  } catch (error) {
    console.log("[resourceId_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
