'use client'
import { logout } from '@/app/actions';
import { useUserStore } from '@/store/user';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    const { clearUser } = useUserStore(state => ({
        clearUser: state.clearUser,
    }))

    useEffect(() => {
        const delay = 2000;
        const timer = setTimeout(async () => {
            const success = await logout();
            if (success) {
                clearUser();
                router.replace('/');
            }
        }, delay);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
}
