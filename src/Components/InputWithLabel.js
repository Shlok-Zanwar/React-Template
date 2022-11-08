/**
 * @param {string} label
 * @param {string} error
 * @param {React.ReactNode} children
 * @param {boolean} isInline
 * @param {string} labelWidth
 * @param {object} divStyle
 * @param {boolean} reqMark
 * @returns {React.ReactNode}
 * @info This is a component that renders a label and an input field
 * @example
 * <InputWithLabel label="Name" error={error.name}>
 *   <Input value={name} onChange={e => setName(e.target.value)} />
 * </InputWithLabel>
*/
export default function InputWithLabel({ 
    label, 
    error,
    children, 
    isInline = false, 
    labelWidth = "auto",
    divStyle = {},
    labelStyle = {},
    reqMark = false, 
}) {

    return (
        <div
            style={{
                display: "inline-flex",
                flexDirection: isInline ? "row" : "column",
                alignItems: isInline ? "center" : "flex-start",
                ...divStyle
            }}
        >
            <label
                style={{
                    color: "var(--inputLabelColor)",
                    fontWeight: "bold",
                    marginRight: "10px",
                    width: labelWidth,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "var(--inputLabelFontSize)",
                    ...labelStyle
                }}
            >
                {label} {reqMark && <span style={{color: "red", marginLeft: '2px'}}>*</span>}
            </label>
            {children}
            <label
                style={{
                    color: "red",
                    marginRight: "8px",
                    display: "inline-block",
                }}
            >
                {error?.errors?.[0]?.msg}
            </label>
        </div>
    );
};
