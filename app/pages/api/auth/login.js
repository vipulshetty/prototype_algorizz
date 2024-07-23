import { generateToken } from '../../../lib/auth';
import cors, { runMiddleware } from '../../../lib/middleware';

const users = {
  admin: 'password', // Example: In production, use hashed passwords and a database
};

export default async function handler(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
    const token = generateToken({ username });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
