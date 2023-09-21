import React from "react";
import { Button, Card, Modal } from "react-bootstrap"; // Import Card from react-bootstrap

export default function DetailModal({ detail, open, onClose }) {
  return (
    detail && (
      <Modal
        show={open}
        onHide={onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Modal C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                {detail.first_name ?? "-"} {detail.last_name ?? "-"}
              </Card.Title>
              <Card.Text>Email: {detail.email ?? "NA"}</Card.Text>
              <Card.Text>Phone Number: {detail.phone_number ?? ""}</Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-C" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
