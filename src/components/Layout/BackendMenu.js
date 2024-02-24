'use client';

import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export default function BackendMenu() {
  let [user, setUser] = useState({});
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser ();
      setUser(user);
    }
    getUser ();
  });

  return (
    <>
    <div className='flex items-center gap-3 border-b-2 pb-3'>
    <div><i className="ph ph-user"></i></div>
    <div className='text-sm'>
      <div className='font-bold'>{user?.user_metadata?.name}</div>
      <div>{user?.email}</div>
    </div>
    </div>
      <ul className="menu">
        <li>
          <Link href={"/user/dashboard"}>Dashboard</Link>
        </li>
       {user?.user_metadata?.role == 'admin' && (
        <>
         <li>
          <Link href={"/admin/features/list"}>Features</Link>
        </li>
        <li>
          <Link href={"/admin/how-it-works/list"}>How it works</Link>
        </li>
        <li>
          <Link href={"/admin/faqs/list"}>Faqs</Link>
        </li>
        
        </>
       )}

{user?.user_metadata?.role == 'user' && (
        <>
         <li>
          <Link href={"/user/events/list"}>Events</Link>
        </li>
        <li>
          <Link href={"/user/member/list"}>Members</Link>
        </li>
        <li>
          <Link href={"/user/transactions/list"}>Transactions</Link>
        </li>
        
        </>
       )}
      </ul>
    </>
  );
}
