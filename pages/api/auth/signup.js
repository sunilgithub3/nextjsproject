import React from 'react'
import { hashPassword } from '../../../lib/auth';
import {connectToDatabase} from "../../../lib/db"

async function signup(req,res) {
    if(req.method !== 'POST'){
        return;
    }
    const data=req.body;
    const {email,password}=data
    if(!email|| !email.includes('@')||!password||password.trim().length<7){
        res.status(422).json({message:"Invalid input - Password should at least 7 Characters"})
        
        return;
    }
   const client = await connectToDatabase();
   const db=client.db();
   const existingUser=await db.collection('users').findOne({email:email})
   if(existingUser){
    res.status(422).json({message:"user already exist"});
    client.close();
    return;
   }
   const hashedPassword=await hashPassword(password);
   const result = await db.collection('users').insertOne({
      email:email,
      password:hashedPassword


   })
   res.status(201).json({message:"Created User!"})
   client.close();
}

export default signup
