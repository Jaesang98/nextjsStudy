import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from './DetailLink';

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection('post').find().toArray();

  return (
    <>
      <div className="navbar">
        <Link href="/" className="logo">Appleforum</Link>
        <Link href="/list">List</Link>
      </div>

      {
        result.map((item, idx) =>
          <div className="list-bg" key={idx}>
            <div className="list-item">
              <h4>{item.title}</h4>
              <Link href={`/detail/${item._id}`}>링크</Link>
              <Link href={`/edit/${item._id}`}>수정하기</Link>
              {/* <DetailLink></DetailLink> */}
              <p>1월 1일</p>
            </div>
          </div>
        )
      }
    </>
  )
} 