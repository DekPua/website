'use client'

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Logout() {
    deleteCookie('access_token');
    const router = useRouter();
    
    router.prefetch('/');
    router.push('/');
    router.refresh();
}