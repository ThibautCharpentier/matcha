import { useState, useEffect, useRef } from 'react';

export default function NameBlock({firstname, lastname}) {
    const nameRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    
    useEffect(() => {
		const el = nameRef.current;
		if (el && el.scrollWidth > el.clientWidth) {
			setIsOverflowing(true);
		} else {
			setIsOverflowing(false);
		}
	}, [firstname, lastname]);

    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onTouchStart={() => setShowTooltip(true)}
            onTouchEnd={() => setTimeout(() => setShowTooltip(false), 1500)}
        >
            <div ref={nameRef} className="w-full">
                {isOverflowing ? (
                    <div >
                        <p className="truncate w-full">{firstname}</p>
                        <p className="truncate w-full">{lastname}</p>
                    </div>
                ) : (
                    <p>{firstname} {lastname}</p>
                )}
            </div>
            {showTooltip && isOverflowing && (
                <div className="absolute z-40 top-full right-0 mt-1
                                bg-[--color-dark-green] text-black text-xs px-2 py-1 rounded shadow-md
                                whitespace-normal break-words text-left">
                    {firstname} {lastname}
                </div>
            )}
        </div>	
    )
}
