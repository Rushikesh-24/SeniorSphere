"use client"
import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";
import { withRouter } from 'next/router';

export default function Home() {
  return(
    <>
    <Link href="/Login">Login</Link>
    </>
  )
};

