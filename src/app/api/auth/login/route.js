import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { connectDb } from '@/configs/dbConfig';
import User from '@/models/user';

connectDb();

export async function POST(request) {
  try {
    const body = await request.json();

    console.log('body Credentials :>> ', body);
    const { email, password } = body;

    //check if user already exists
    const user = await User.findOne({ email });

    console.log('user :>> ', user);

    if (!user) {
      return NextResponse.json({ error: 'No such user in DB' }, { status: 400 });
    }

    //check password
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return NextResponse.json({ error: 'Email or password is wrong' }, { status: 401 });
    }

    // create token
    // const jwtPaylooad = {
    //   id: user._doc._id,
    //   name: user._doc.name,
    //   email: user._doc.email,
    //   image: user._doc.image,
    // };
    // const accessToken = jwt.sign(jwtPaylooad, process.env.JWT_SECRET, {
    //   expiresIn: '1h',
    // });
    // const result = {
    //   ...jwtPaylooad,
    //   accessToken,
    // };

    // const savedUser = await User.findByIdAndUpdate(user._doc._id, {
    //   accessToken,
    // });
    // console.log('savedUser :>> ', savedUser);

    // return new Response(JSON.stringify(result, { status: 200 }));
    // return NextResponse.json(savedUser, { status: 200 });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log('error :>> ', error);
    return NextResponse.json(null);
  }
}
