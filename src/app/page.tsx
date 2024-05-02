"use client"

import React, { useEffect } from "react";
import { isAdminLoggedIn } from '../utils/auth'
import { redirect } from 'next/navigation'

export default function Home({children} : {children: React.ReactNode}) {
  // const router = useRouter();

  useEffect(() => {
    if(!isAdminLoggedIn()){
      redirect('/register')
    }
    else{
      redirect('/dashboard')
    }
  }, [])

  return (
    <>
      {children}
    </>
  );
}
