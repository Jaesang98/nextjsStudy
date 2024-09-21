import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
    if (요청.method == "POST") {
        const client = await connectDB;
        const db = client.db("forum");

        let 바꿀거 = {
            title : 요청.body.title,
            content : 요청.body.content
        }

        await db.collection('post').updateOne(
            {_id: new ObjectId(요청.body._id) },
            { $set: 바꿀거  }
        );
        return 응답.status(200).redirect(302, '/list');
    }
}