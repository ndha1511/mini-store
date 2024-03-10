import { Button, Card } from "react-bootstrap";

function CardCustom({src, productName, price}) {
    return (
        <Card style={{ width: '18rem', margin: 5 }}>
            <Card.Img variant="top" src={src} />
            <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Card.Text>Giá: {price}</Card.Text>
                <Button variant="danger">Xem chi tiết</Button>
            </Card.Body>
        </Card>
    );
}

export default CardCustom;