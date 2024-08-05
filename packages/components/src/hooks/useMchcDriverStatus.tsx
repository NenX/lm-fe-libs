import { mchcDriver } from "@lm_fe/env";
import { useEffect, useState } from "react";

export function useMchcDriverStatus() {
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        const id = setInterval(() => {
            setIsOpen(mchcDriver.isOpen)
        }, 2000)

        return () => {
            clearInterval(id)
        }
    }, [])
    return { isOpen }
}