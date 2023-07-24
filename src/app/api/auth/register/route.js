import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { connectDb } from '@/configs/dbConfig';
import User from '@/models/user';

connectDb();

export async function POST(request) {
  try {
    const body = await request.json();

    //check if user already exists
    const user = await User.findOne({ email: body.email });
    if (user) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    //prepare user dats and save new user
    const newUser = { ...body, password: hashedPassword };

    const savedUser = await User.create(newUser);

    //return only needed fields
    const userWithoutPass = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    };

    return NextResponse.json(body, { status: 201 });
    // return NextResponse.json(userWithoutPass, { status: 201 });
  } catch (error) {
    console.log('error :>> ', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
