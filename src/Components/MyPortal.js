import ReactDOM from "react-dom";
import React from "react";

// Note should be in bold
/**
 * @param {string} id
 * @param {React.ReactNode} children
 * @Note <i>The id of the element should be unique and present in the DOM</i>
 * @info This is a portal that renders the children in the element with the given id
 * @example
 * <MyPortal id="portal">
 *   <div>Some content</div>
 * </MyPortal>
 * 
*/
export default function MyPortal({ children, id }) {
    // Use DOM to add a new element to the body
    const portal = document.getElementById(id);
    // Checking if the DOM is ready
    const [domReady, setDomReady] = React.useState(false);

    React.useEffect(() => {
        setDomReady(true);
        console.log("DOM Ready");
    }, []);

    return domReady ? ReactDOM.createPortal(children, portal) : null;
}

// export const MyPortal = ({ children, id }) => {
//     const portalElement = document.createElement("div");
//     portalElement.id = id;

//     React.useEffect(() => {
//         document.body.appendChild(portalElement);
//         return () => {
//             document.body.removeChild(portalElement);
//         };
//     }, [portalElement]);

//     return ReactDOM.createPortal(children, portalElement);
// };
