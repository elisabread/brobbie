import React, { useState, useContext } from "react";
import logo from "../assets/brobbielogo.png";
import { Image, HStack, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { userContext } from "../utils/userContext";

export default function Navbar() {
  const [user, setUser] = useContext(userContext);
  const [activeButton, setActiveButton] = useState("list");

  const handleButtonClick = (buttonValue) => {
    setActiveButton(buttonValue);
  };

  if (user.email) {
    return (
      <VStack py={10} gap={4}>
        <Image src={logo} alt="Brobbie logo" />
        <HStack gap={4}>
          <Link
            to="editor"
            style={{
              color: activeButton === "new" ? "#D8F4C9" : "#5A714D",
              backgroundColor: activeButton === "new" ? "#5A714D" : "#D8F4C9",
              fontWeight: "600",
              borderRadius: "25px",
              padding: ".5rem 1rem",
            }}
            onClick={() => handleButtonClick("new")}
          >
            New Document
          </Link>
          <Link
            to="/list"
            style={{
              color: activeButton === "list" ? "#D8F4C9" : "#5A714D",
              fontWeight: "600",
              backgroundColor: activeButton === "list" ? "#5A714D" : "#D8F4C9",
              borderRadius: "25px",
              padding: ".5rem 1rem",
            }}
            onClick={() => handleButtonClick("list")}
          >
            All Documents
          </Link>
        </HStack>
      </VStack>
    );
  }
}
