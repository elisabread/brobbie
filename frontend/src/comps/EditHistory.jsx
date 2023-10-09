import { VStack, Heading } from "@chakra-ui/react";
import React from "react";

export default function EditHistory() {
  return (
    <VStack>
      <Heading
        size={"xs"}
        color={"#A8D491"}
        textAlign={"center"}
        pt={"4rem"}
        px={"1.5rem"}
      >
        When you start writing your history with changes will be visible here
      </Heading>
    </VStack>
  );
}
