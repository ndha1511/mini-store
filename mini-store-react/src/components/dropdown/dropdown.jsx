import { Dropdown } from "react-bootstrap";

function DropdownCustom({dropdownName = "dropdown", 
    dropdownItems = [], 
    variantColor = "success",
    onSort}) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant={variantColor} id="dropdown-basic">
                {dropdownName}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    dropdownItems.map((item, index) => (
                        <Dropdown.Item onClick={() => onSort(item.sortBy, item.desc)} key={index}>{item.name}</Dropdown.Item>
                    )
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownCustom;