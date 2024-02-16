'use client';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';

export default function Logout() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();

        router.push('/login');
    }

    return (
        <>
            <button onClick={handleSignOut} className="btn btn-danger">Logout</button>
        </>
    );
}