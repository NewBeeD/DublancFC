import Link from "next/link";

export default function Home(){
  return (
  <h1>
    Home Page

    <br />
    <br />

    <Link href="/blog">Blog</Link>
    <br />
    <br />
    <Link href="/products">Products</Link>

  </h1>)
  
}

