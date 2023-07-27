import { connectDb } from '@/configs/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    console.log('reqBody.provider >>', reqBody.provider);

    if (reqBody.provider === 'credentials') {
      console.log('reqBody Credentials :>> ', reqBody);
      const { name, email, password } = reqBody;

      //check if user already exists
      const user = await User.findOne({ email });

      console.log('user :>> ', user);

      if (!user) {
        return NextResponse.json(
          { error: 'No such user in DB' },
          { status: 400 }
        );
      }

      //check password
      const comparePassword = await bcryptjs.compare(password, user.password);

      if (!comparePassword) {
        return NextResponse.json(
          { error: 'Email or password is wrong' },
          { status: 401 }
        );
      }

      // create token
      const jwtPaylooad = {
        id: user._doc._id,
        name: user._doc.name,
        email: user._doc.email,
        image: user._doc.image,
      };
      const accessToken = jwt.sign(jwtPaylooad, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const result = {
        ...jwtPaylooad,
        accessToken,
      };

      const savedUser = await User.findByIdAndUpdate(user._doc._id, {
        accessToken,
      });
      console.log('savedUser :>> ', savedUser);
      // return new Response(JSON.stringify(result, { status: 200 }));
      return NextResponse.json(savedUser, { status: 200 });
    }

    if (reqBody.provider === 'google') {
      console.log('Creating Google user...');

      // const { name, email, password, image } = reqBody;

      //check if user already exists
      const user = await User.findOne({ email: reqBody.email });

      console.log('user in DB :>> ', user);

      if (user && user.password !== process.env.GOOGLE_SECRET) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      if (!user) {
        console.log('reqBody Google :>> ', reqBody);
        const savedUser = await User.create(reqBody);

        console.log('savedUser :>> ', savedUser);

        return NextResponse.json(savedUser, { status: 201 });
      }

      console.log('user :>> ', user);
      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    console.log('error :>> ', error);
    return NextResponse.json(null);
  }
}
