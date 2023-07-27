import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

import { connectDb } from '@/configs/dbConfig';
import User from '@/models/user';
// import Account from '@/models/account';

connectDb();

export async function POST(request) {
  try {
    const body = await request.json();

    // console.log('loginRoute body:>> ', body);
    const { email, password } = body;

    //check if user already exists
    const user = await User.findOne({ email });

    if (!user) {
      // return NextResponse.json({ error: 'No such user in DB' }, { status: 400 });
      return NextResponse.json({ error: 'Email or password is wrong' }, { status: 400 });
    }

    //check password
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return NextResponse.json({ error: 'Email or password is wrong' }, { status: 400 });
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    };

    console.log('loginRoute userData:>> ', userData);

    return NextResponse.json(userData, { status: 200 });

    // // const refresh_token = jwt.sign(userData, process.env.JWT_SECRET, {
    // //   expiresIn: '30d',
    // // });
    // const access_token = jwt.sign(userData, process.env.JWT_SECRET, {
    //   expiresIn: '1h',
    // });
    // // const decodedJwt = jwt.decode(access_token);
    // // console.log('decodedJwt :>> ', decodedJwt);
    // // const result = {
    // //   ...jwtPaylooad,
    // //   access_token,
    // // };

    // const account = {
    //   userId: user._id,
    //   // refresh_token,
    //   access_token,
    //   expires_at: jwt.decode(access_token).exp,
    //   token_type: 'Bearer',
    // };
    // console.log('account :>> ', account);

    // const newAccount = await Account.create(account);
    // ==============================================

    // const savedUser = await User.findByIdAndUpdate(user._id, {
    //   accessToken,
    // });
    // console.log('savedUser :>> ', savedUser);

    // return new Response(JSON.stringify(result, { status: 200 }));
    // return NextResponse.json(savedUser, { status: 200 });
    // return NextResponse.json({ user: userData, account }, { status: 200 });
    // return NextResponse.json(body, { status: 200 });
  } catch (error) {
    console.log('error :>> ', error);
    return NextResponse.json(null);
  }
}
