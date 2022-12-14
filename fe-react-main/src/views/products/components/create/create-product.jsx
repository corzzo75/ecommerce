import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { useProductsContext } from "../../../../context/products/products.context";
import { productsService } from "../../../../services/products";
import "./index.css";

export const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [image, setImage] = useState(null);
  const [isLoadingCreateProduct, setIsLoadingCreateProduct] = useState(false);

  useEffect(() => {
    console.log({ image });
  }, [image]);

  const { createProduct } = useProductsContext();

  const resetValues = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setImgUrl("");
    setIsLoadingCreateProduct(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoadingCreateProduct(true);
    await createProduct(
      {
        name,
        description,
        price,
        stock,
      },
      image
    );
    setIsLoadingCreateProduct(false);
    resetValues();
  };

  return (
    <div className="create-product padded-border">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="input"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="input"
                placeholder="Descripcion"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Link de imagen</Form.Label>
              <Form.Control
                type="file"
                placeholder="Imagen"
                required
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoadingCreateProduct}
          >
            Guardar {isLoadingCreateProduct && <Spinner animation="border" />}
          </Button>
        </div>
      </Form>
    </div>
  );
};
