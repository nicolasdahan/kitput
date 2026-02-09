import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, rating, comment } = await request.json();

    if (!productId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Check if user already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 400 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        productId,
        rating,
        comment: comment || null,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

