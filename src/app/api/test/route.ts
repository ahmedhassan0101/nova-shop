// /src/app/api/test/route.ts
// http://localhost:3000/api/test
import connectDB from "@/lib/mongodb";

export async function GET(request: Request) {
  console.log("🚀 ~ GET ~ request:", request);
  try {
    await connectDB();
    return Response.json(
      {
        status: "Success",
        message: "Connected to MongoDB Atlas successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        status: "Error",
        message: "Failed to connect to MongoDB.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// export async function POST(request: Request) { ... }
