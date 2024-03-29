import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getTokenFormData";
import User from "@/models/userModal";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      mesaaage: "User found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
