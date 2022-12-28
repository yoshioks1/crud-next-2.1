// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
*/

import { pool } from "../../config/db";

export default async function handler(req, res) {
  const results = await pool.query("SELECT NOW()");
  console.log(results);
  res.status(200).json({ result: results[0]["NOW()"] });
}
