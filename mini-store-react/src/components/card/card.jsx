import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { formatVND } from "../../services/productService";

function CardCustom({src, productName, price, click, productId}) {
    const [bg, setBg] = useState('light');

    return (
        <Card 
        style={{ width: '18rem', margin: 5 }} 
        onClick={() => click(productId)} 
        bg={bg} 
        onMouseEnter={() => setBg('info')}
        onMouseLeave={() => setBg('light')}
        >
            <Card.Img variant="top" src={src} height={280}/>
            <Card.Body>
                <Card.Title style={{height: "60px"}}>{productName}</Card.Title>
                <Card.Text>Giá: {formatVND(price)}</Card.Text>
                <Button variant="danger">Xem chi tiết</Button>
            </Card.Body>
        </Card>
    );
}

export default CardCustom;