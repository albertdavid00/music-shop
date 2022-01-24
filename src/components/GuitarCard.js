import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import "../styles.css";
export default function GuitarCard(props) {
  const { guitar, handleOnAddToCart, hiddenButton } = props;

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "300px", minWidth: '265px'}}>
        <Card className="shadow mb-3 bg-white">
          <Card.Body className="cardBody">
            <div className="w-100 d-flex flex-column align-items-center ">
              <div className="guitarImgContainer mb-2">
                <img
                  src={guitar.photoURL}
                  alt="guitar"
                  width={"240px"}
                  height={"170px"}
                  style={{ objectFit: "contain" }}
                  className="guitarImg"
                />
              </div>
              <div className="w-100 text-center">
                <Card.Title>
                  <strong>{guitar.brand} </strong> {guitar.model}
                </Card.Title>
                <div className="mt-3 mb-2 d-flex flex-column align-items-center">
                  <div>
                   <strong>{guitar.type} Guitar</strong>
                  </div>
                  <div>
                    <strong>{guitar.price} </strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center w-100">
              <div className="buttonWrapper">
                <Button hidden={hiddenButton} variant="outline-light" style={{backgroundColor: '#9e7315'}} onClick={() => handleOnAddToCart(guitar)}> Add To Cart</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
