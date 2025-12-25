import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      "https://dummyjson.com/products?limit=10&skip=0"
    );

    // console.log(response.data);
    return NextResponse.json({
      success: true,
      message: "Products list fetched successfully",
      products: response.data.products,
    });
  } catch (error) {
    console.error("Error while fetching users", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while fetching the products list",
      },
      { status: 500 }
    );
  }
}
