import { Box, Heading, VStack, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import docIcon from "../assets/icons/doc.svg";

export default function MyDocItem(doc) {
  const docItem = doc.doc;
  return (
    <Box
      bg={"#F9FFF6"}
      borderRadius={"15px"}
      boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.06)"}
      width={"100%"}
      px={"4rem"}
      py={"2rem"}
    >
      <Link to={`/editor/${docItem.id}`}>
        <HStack gap={10}>
          <Image src={docIcon} alt="document icon" />
          {docItem ? (
            <Heading size={"md"}>{docItem.title}</Heading>
          ) : (
            <Heading></Heading>
          )}
        </HStack>
      </Link>
    </Box>
  );
}
