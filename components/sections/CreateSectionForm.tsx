"use client";
import { Course } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and should be at least 2 characters",
  }),
});

export default function CreateSectionForm({ course }: { course: Course }) {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: "Basic Information",
      path: `/instructor/courses/${course.id}/basic`,
    },
    {
      label: "Curriculum",
      path: `/instructor/courses/${course.id}/sections`,
    },
  ];

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(
        `/api/courses/${course.id}/sections`,
        values
      );
      router.push(`/instructor/courses/${course.id}/sections/${res.data.id}`);
      toast.success("Section created!");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Failed to create a new section", error);
    }
  };

  return (
    <div className="px-10 py-6">
      <div className="flex gap-5">
        {routes.map((route) => (
          <Link key={route.path} href={route.path}>
            <Button variant={pathname === route.path ? "default" : "outline"}>
              {route.label}
            </Button>
          </Link>
        ))}
      </div>

      <h1 className="text-xl font-bold mt-5">Add New Section</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. Introduction" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-5">
            <Link href={`/instructor/courses/${course.id}/basic`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
