import React, { useState } from "react";
import "./App.css";
import Modal from "./components/common/Modal";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="App">
      <Card className="text-center">
        <Card.Body>
          <Card.Text>
            <Link to={`/A`}>
              <Button
                className="btn-A"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Button A
              </Button>
            </Link>
          </Card.Text>
          <Card.Text>
            <Link to={`/B`}>
              <Button
                className="btn-B"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Button B
              </Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>

      {modalShow && (
        <Modal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
          backdrop="static"
        />
      )}
    </div>
  );
}

export default App;
