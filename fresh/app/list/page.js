import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from './DetailLink';
import ListItem from "./ListItem";

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

      <ListItem result={result}></ListItem>
    </>
  )
} 