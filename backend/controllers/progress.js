import { pool } from "../config/db.js"; 

export const getProgress = async (req, res) => {
  try {
    const { userId } = req;
 
    const questionsQuery = `
      SELECT 
        q.id AS question_id,
        q.title,
        q.link,
        q.difficulty,
        p.status,
        p.attempts,
        p.notes,
        p.updated_at
      FROM questions q
      LEFT JOIN user_progress p 
      ON q.id = p.question_id AND p.user_id = $1
      WHERE q.user_id = $1
      ORDER BY q.id ASC;
    `;

    const questions = await pool.query(questionsQuery, [userId]);


    
    const statsQuery = `
      SELECT
        COUNT(*) FILTER (WHERE status = 'done') AS completed,
        COUNT(*) FILTER (WHERE status = 'not-done') AS pending,
        COUNT(*) FILTER (WHERE status = 'half-done') AS partial,
        COUNT(*) AS total
      FROM user_progress
      WHERE user_id = $1;
    `;

    const stats = await pool.query(statsQuery, [userId]);


    // 3️⃣ Graph data (weekly updates grouped by date)
    const graphQuery = `
      SELECT 
        DATE(updated_at) AS day,
        COUNT(*) AS updates
      FROM user_progress
      WHERE user_id = $1
      GROUP BY day
      ORDER BY day ASC;
    `;

    const graph = await pool.query(graphQuery, [userId]);


    res.json({
      success: true,
      questions: questions.rows,
      stats: stats.rows[0],
      graph: graph.rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateProgress = async (req, res) => {
  try {
    const { userId } = req; // from Google OAuth middleware
    const { questionId, status, attempts, notes } = req.body;

    const query = `
      INSERT INTO user_progress (user_id, question_id, status, attempts, notes)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (user_id, question_id)
      DO UPDATE SET
        status = EXCLUDED.status,
        attempts = EXCLUDED.attempts,
        notes = EXCLUDED.notes,
        updated_at = NOW()
      RETURNING *;
    `;

    const values = [userId, questionId, status, attempts, notes];

    const result = await pool.query(query, values);

    res.json({
      success: true,
      message: "Progress updated",
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
