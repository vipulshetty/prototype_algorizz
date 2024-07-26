import { generateToken } from '../../../app/lib/auth.mjs';

const users = [
  { username: 'admin', password: 'password' } 
];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = generateToken({ username: user.username });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' }); // Unauthorized
  }
}
