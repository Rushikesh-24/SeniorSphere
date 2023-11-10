import User from "@/models/userSchema";
import { connect } from "@/lib/dbConfig";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req) {
    try {
        const {name,email, password} = await req.json();
        console.log(name, email, password);

// hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        await connect();
        await User.create(name, email, hashedPassword);
        return NextResponse.json({message: ' User registered successfully'})
    } catch (error) {
        return NextResponse.json({message: ' Error occured'}, {status: 500});
    }
}