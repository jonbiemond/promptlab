import * as dotenv from 'dotenv';
import { NextResponse } from "next/server";
import { database } from '../../../../models/db';
import { CosmosClient } from '@azure/cosmos';
import { Dao } from "../../../../models";

dotenv.config();

export async function POST(req: Request) {
    const endpoint = process.env.COSMOS_ENDPOINT as string
    const key = process.env.COSMOS_KEY as string

    const client = new CosmosClient({
        endpoint,
        key
    })

    const goal = await req.json()
    try {
        // instance
        // const goals  = await client
        //     .database(config.database)
        //     .container(config.container)
        //     .items.readAll()
        //     .fetchAll();

        

        // const createGoals = await database.users.create({
            
        // })
        
        // JSON response with the result message
        // return NextResponse.json();
    } catch (error) {
        console.error('An error occurred:', error);
        return NextResponse.json({ 'error': 'An error occurred' }, { status: 500 })
    }
}
