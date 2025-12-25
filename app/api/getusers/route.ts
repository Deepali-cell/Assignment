import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      "https://dummyjson.com/users?limit=10&skip=0"
    );

    return NextResponse.json({
      success: true,
      message: "User list fetched successfully",
      users: response.data.users,
    });
  } catch (error) {
    console.error("Error while fetching users", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while fetching the users list",
      },
      { status: 500 }
    );
  }
}
