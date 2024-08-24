import type { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '../../../ormconfig';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create({ email, password: hashedPassword });
    await userRepository.save(newUser);
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
}
