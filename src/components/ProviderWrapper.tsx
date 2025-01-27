'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

type ProviderWrapperProps = {
    children: React.ReactNode
}

function ProviderWrapper({ children }: ProviderWrapperProps) {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>

    )
}

export default ProviderWrapper
