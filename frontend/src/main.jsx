import React from "react";
import { ChakraProvider, Box, VStack } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider>
      <VStack
        minH={"100vh"}
        w={"100vw"}
        justifyContent={"start"}
        alignItems={"center"}
        bg={"#D8F4C9"}
        h={"full"}
      >
        <App />
      </VStack>
    </ChakraProvider>
  </BrowserRouter>,
);
