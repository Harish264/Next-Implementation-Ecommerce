import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
import { NextResponse,NextRequest } from "next/server";

connect()

export async function POST(){
    try {
        const reqBody = await NextRequest.json()
        console.log("@@@@",reqBody)
        const {productId,quantity} = reqBody
        const existingItem = await Cart.findOne({productId})
        if(existingItem){
            existingItem.quantity += quantity
            await existingItem.save()
        }
        else{
            const newItem = new Cart({productId,quantity})
            await newItem.save()
        }
        NextResponse.json({message:"Item added to cart successfully"},{status:200})
    } catch (error) {
        
    }

}