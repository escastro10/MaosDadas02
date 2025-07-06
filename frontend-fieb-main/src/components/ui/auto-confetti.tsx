'use client'

import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export default function AutoConfetti() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [isExploding, setIsExploding] = useState(false)

    useEffect(() => {
        // Set initial dimensions
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        })

        // Start confetti
        setIsExploding(true)

        // Update dimensions on window resize
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)

        // Stop confetti after 5 seconds
        const timer = setTimeout(() => setIsExploding(false), 5000)

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
            clearTimeout(timer)
        }
    }, [])



    return isExploding && (
        <Confetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false}
            numberOfPieces={500}
        />
    )


}