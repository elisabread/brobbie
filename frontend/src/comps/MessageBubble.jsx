import {
  VStack,
  Heading,
  Box,
  Textarea,
  IconButton,
  Text,
  HStack,
} from "@chakra-ui/react";

const MessageBubble = ({ message, text }) => {
  let truncatedEmail = message.authorID;

  if (message.authorID.includes("@")) {
    truncatedEmail = message.authorID.split("@")[0];
  }
  return (
    <VStack
      bg={message.authorID === text.creator ? "#FFD978" : "#FFE7E7"}
      py={4}
      px={4}
      borderRadius={"lg"}
      w={"240px"}
      alignItems={"start"}
      key={message.id}
    >
      <HStack w={"full"} color={"#5A714D"}>
        <Box borderRadius={"full"}>
          <Text
            bgColor={"#5A714D"}
            w={8}
            h={8}
            fontSize={"10px"}
            textAlign={"center"}
            p={2}
            borderRadius={"full"}
            color={"white"}
          >
            {message.authorID.charAt(0)}
          </Text>
        </Box>
        <VStack
          py={2}
          alignItems={"start"}
          fontSize={"12px"}
          justifyContent={"center"}
        >
          <Text>{truncatedEmail}</Text>
          {message.authorID === text.creator ? (
            <Text>Creator</Text>
          ) : (
            <Text>Brobbie</Text>
          )}
        </VStack>
      </HStack>
      <VStack fontSize={"14px"}>
        <Text>{message.content}</Text>
      </VStack>
    </VStack>
  );
};

export default MessageBubble;
