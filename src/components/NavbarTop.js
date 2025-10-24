import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function NavbarTop() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>User Profiles Management</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
