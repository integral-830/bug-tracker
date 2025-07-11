import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validation";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validiation = issueSchema.safeParse(body);
  if (!validiation.success)
    return NextResponse.json(validiation.error.errors, { status: 400 });
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
