import React from "react";
import { Button } from "react-bootstrap";

export default function SomethingWentWrong() {
  return (
    <div>
      <p>Sorry, something went wrong.</p>
      <Button type="primary" href="/">
        Back Home
      </Button>
    </div>
  );
}
