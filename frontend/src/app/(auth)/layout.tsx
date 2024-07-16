"use client"

import { Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {name: "Register", href: "/register"},
  {name: "Login", href: "/login"},
  {name: "Forgot Password", href: "/forgot-password"},
]


export default function Layout({children}: {children: React.ReactNode}) {

  const pathName = usePathname()
  const [input, setInput] = useState("")
  


  return (
    <section>

      <br />
      <br />

      <input value={input} onChange={e => { setInput(e.target.value)}}/>

      {navLinks.map((link, idx) => {
        const isActive = pathName.startsWith(link.href)

        return(
          <Link href={link.href} key={idx} >
            <Typography color={isActive? 'red': ''} >{link.name}</Typography>
          </Link>

        )
      })}


      {children}
    </section>
  );
}