import { LineChart } from 'lucide-react'
import React from 'react'

function Logo() {
    return (
        <>
            <LineChart className="h-8 w-8 text-primary dark:text-cyan-400" />
            <span className="text-xl font-bold bg-primary bg-clip-text text-transparent">
                Spenz.
            </span>
        </>
    )
}

export default Logo