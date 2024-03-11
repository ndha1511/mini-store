import { Carousel } from "react-bootstrap";


function CarouselsCustom({ dataRender = [], width, height }) {

    return (
        <Carousel className="bg-dark" style={{width: width}}>
            {dataRender.map((item, index) => {
                return (
                    <Carousel.Item key={index}>
                        <img src={item.imageUrl ? item.imageUrl : ''} alt="carousels" width={width} height={height} />
                        {item.caption ? <Carousel.Caption>
                            {item.caption}
                        </Carousel.Caption> : <></>}
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
}

export default CarouselsCustom;