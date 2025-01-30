'use client'

import { getUserInfo } from '@/lib/api/auth'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/useAuthStore'
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { setUser } = useAuthStore();
    const router=useRouter();

    const { data, error } = useQuery({
        queryKey: ['user'],
        queryFn: getUserInfo
    });
    
    useLayoutEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data, setUser]);

    if(error) router.push('/login');
    return <>{children}</>
}
