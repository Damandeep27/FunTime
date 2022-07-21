import React, { useState, useRef, useLayoutEffect } from 'react'
import { Box } from '@chakra-ui/react'

const AutoSizer = ({ children, className, style }) => {
    const [childParams, setChildParams] = useState({ width: 0, height: 0 });
    const parentRef = useRef();

    useLayoutEffect(() => {
        if (!parentRef) return;
        const updateSize = () => {
            setChildParams({
                width: parentRef.current.clientWidth,
                height: parentRef.current.clientHeight
            })
        }
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [parentRef])

    return (
        <Box
            ref={parentRef}
            className={className}
            style={{...style}}
            h='full'
            flex='1'
        >
            {children(childParams)}
        </Box>
    )
}

export default AutoSizer