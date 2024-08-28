import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {

    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)});
    console.log(result)

    return (
      <div className="p-20">
        <form action="/api/post/edit" method="POST">
          <input name="title" placeholder="글제목" defaultValue={result.title}/>
          <input name="content" placeholder="글내용" defaultValue={result.content}/>
          <input name="_id" placeholder="아이디" value={result._id}/>
          <button type="submit">전송</button>
        </form>
      </div>
    )
  } 