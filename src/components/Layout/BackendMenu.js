'use client'

import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function BackendMenu() {
  const supabase = createClientComponentClient();

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <ul className="menu">
        <li>
          <Link href={"/user/dashborad"}>Deshborad</Link>
        </li>
        <li>
          <Link href={"/admin/features/list"}>Features</Link>
        </li>
        <li>
          <Link href={"/admin/how-it-works/list"}>How it works</Link>
        </li>
        <li>
          <Link href={"/admin/faqs/list"}>Faqs</Link>
        </li>
        <li>
          <a>Blog</a>
        </li>
        <li>
          <a>Contact</a>
        </li>
      </ul>
    </>
  );
}
