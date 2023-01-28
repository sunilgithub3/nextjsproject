import {MongoClient} from "mongodb"

import React from 'react'

export async function connectToDatabase() {
  
    const client=await MongoClient.connect(
        'mongodb+srv://Hari:6bMZXgPV8KuYZBSt@cluster0.atd6j00.mongodb.net/auth-demo?retryWrites=true&w=majority'
     );
        console.log(client)
        return client;

}





