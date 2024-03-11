import { useState } from "react";

function ButtonHover({ className = '', color,  colorHover, borderColor, borderColorHover, content }) {
    const [colorHV, setColorHV] = useState(color);
    const [boderColorHV, setBorderColorHV] = useState(borderColor);
    return (
        <button
            className={className}
            onMouseEnter={() => {setColorHV(colorHover); setBorderColorHV(borderColorHover);}}
            onMouseLeave={() => {setColorHV(color); setBorderColorHV(borderColor);}}
            style={{
                color: colorHV,
                borderColor: boderColorHV
            }}
        >
            {content}
        </button>
    );
}

export default ButtonHover;