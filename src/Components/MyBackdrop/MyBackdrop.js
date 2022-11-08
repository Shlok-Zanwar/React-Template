// import React from "react";

// export default function MyModal() {
//     return <div>index</div>;
// }

import React from 'react'
import ReactDOM from 'react-dom';
import "./MyBackdropCss.css";

export default function MyBackdrop({
    open=true,
    setOpen=()=>{},
    onClose=()=>{setOpen(false)},
    maskClassName='',
    maskStyle={},
    closeOnClickMask=false,
    closeOnEsc=true,
    children,
}) {

    // const closeOnEscapeKeyDown = (e) => {
    //     if ((e.charCode || e.keyCode) === 27) {
    //         onClose();
    //     }
    // };

    const closeOnEscapeKeyDown = React.useCallback((e) => {
        if ((e.charCode || e.keyCode) === 27) {
            onClose();
        }
    }, [onClose]);

    React.useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
        };
    }, [closeOnEscapeKeyDown]);


    return ReactDOM.createPortal( 
        (
            <div 
                className={` my-backdrop-mask ${open ? 'my-backdrop-mask-open' : ''} ${maskClassName}`}
                style={maskStyle}
                onClick={() => {
                    if (closeOnClickMask) {
                        setOpen(false);
                        onClose();
                    }
                }}
            >
                {children}
            </div>
        ), document.getElementById('root')
    );
}
