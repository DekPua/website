'use client'

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const metadata = {
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
}

export default function Logout() {
    deleteCookie('access_token');
    const router = useRouter();
    
    router.prefetch('/');
    router.push('/');
    router.refresh();
}