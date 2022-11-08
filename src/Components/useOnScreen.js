import { useEffect, useRef, useState } from "react";

export default function useOnScreen({
	// ref, 
	rootMargin = "0px",
	once = true,
	entryCallback = () => {},
}) {
    // State and setter for storing whether element is visible
	const ref = useRef(null);
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update our state when observer callback fires
                setIntersecting(entry.isIntersecting);

				if(entry.isIntersecting) {
					entryCallback();

					if(once && ref.current) {
						observer.unobserve(ref.current);
					}
				}

            },
            { rootMargin }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
			if(ref.current) {
				observer.unobserve(ref.current);
			}
            // observer.unobserve(ref.current);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return [ref, isIntersecting];
}
