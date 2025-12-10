import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { pool } from "../config/db.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    // verify Google token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    // create/find user in DB
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    let user;
    if (userQuery.rows.length === 0) {
      const insert = await pool.query(
        "INSERT INTO users (name, email) VALUES ($1,$2) RETURNING *",
        [name, email]
      );
      user = insert.rows[0];
    } else {
      user = userQuery.rows[0];
    }

    // generate your own JWT for your app
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      user,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Google Auth failed" });
  }
};
