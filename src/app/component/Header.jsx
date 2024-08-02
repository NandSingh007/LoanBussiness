"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./header.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
import quick from "../Image/quick.png";

const Header = () => {
  const expand = "lg"; // Set the desired breakpoint

  return (
    <Navbar expand={expand} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand
          href="#"
          style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}
        >
          QucikLoan
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <Nav.Link href="#HowToApply" className="navlink">
                Documents
              </Nav.Link>
              <Nav.Link href="#AboutUs" className="navlink">
                About Us
              </Nav.Link>
              <Nav.Link href="#OurPackage" className="navlink">
                Our Package
              </Nav.Link>
            </Nav>
            <Image src={quick} width={50} alt="img" />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
