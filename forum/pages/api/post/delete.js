import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
    if (요청.method == "DELETE") {
        const client = await connectDB;
        const db = client.db("forum");

        await db.collection('post').deleteOne({_id: new ObjectId(요청.body) });
        return 응답.status(200).json('삭제완료');
    }
}