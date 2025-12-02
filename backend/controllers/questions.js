import {pool} from "../config/db.js";
export const getQuestion = async(req,res)=>{
    try {
        const result = await pool.query("SELECT * FROM questions order by id DESC");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export const addQuestion = async(req,res)=>{
    const {title,link,difficulty}=req.body;
    try{
          await pool.query(
            "INSERT INTO questions (title, link, difficulty) VALUES ($1,$2,$3)"
            ,[title,link,difficulty]
        );
        res.status(201).json({message:"Question added successfully"});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};