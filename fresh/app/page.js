import { connectDB } from "@/util/database";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection('post').find().toArray();

  return (
    <div>
      <h3>메인입니다</h3>
    </div>
  );
}
