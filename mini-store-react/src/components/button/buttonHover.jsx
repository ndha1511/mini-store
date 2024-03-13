import { useState } from "react";


function ButtonHover({
    color,
    colorHover,
    borderColor,
    borderColorHover,
    content,
    click = () => false,
    action = () => false,
    active = false,
    index,
    width = 50,
    height = 30,
    disabled = false,
     }) {
 
    const [colorHV, setColorHV] = useState(color);
    
    const [borderColorHV, setBorderColorHV] = useState(borderColor);
    return (
        <button
            disabled={disabled}
            onClick={() => {click(index); action();}}
            onMouseEnter={() => { setColorHV(colorHover); setBorderColorHV(borderColorHover); }}
            onMouseLeave={() => { 
                setColorHV(color); setBorderColorHV(borderColor);
            }}
            style={{
                color: active ? colorHover : colorHV,
                borderColor: active ? borderColorHover : borderColorHV,
                width: width,
                height: height,
                backgroundColor: disabled ? 'gray'  : "#fff",
                opacity: disabled ? 0.4 : 1,
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {content}
        </button>
    );
}

export default ButtonHover;