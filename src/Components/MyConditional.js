/**
 * @param {boolean} visible
 * @param {boolean} hidden
 * @param {React.ReactNode} children
 * 
 * @description
 * The Component is used to conditionally render a component.
 * It will be rendered if visible is true and hidden is false.
 */
export default function MyConditional({
    visible=true,
    hidden=false,
    children,
}) {

  return visible && !hidden ? children : null;
}
