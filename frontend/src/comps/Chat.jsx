import {
  VStack,
  Heading,
  Box,
  Textarea,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import send from "../assets/icons/send.svg";
import { userContext } from "../utils/userContext";
import { useParams } from "react-router-dom";
import { textContext } from "../utils/textContext";

export default function Chat() {
  ////////////////////////////////////////////////////////////////////////////////
  // Constants
  ////////////////////////////////////////////////////////////////////////////////
  const [input, setInput] = useState();
  const [user, setUser] = useContext(userContext);
  const [comments, setComments] = useState([]);
  const { docId } = useParams();
  const [text, setText] = useContext(textContext);

  ////////////////////////////////////////////////////////////////////////////////
  // Functions
  ////////////////////////////////////////////////////////////////////////////////
  //Get all comments associated to the text
  async function getComments() {
    const query = `query ListComments {
      listComments(textID: "${text.id}") {
        authorID
        content
        id
        textID
        timestamp
      }
    }`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({ query }),
    };

    const res = fetch(`${import.meta.env.VITE_API_URL}`, requestOptions)
      .then((response) => response.json())
      .then((response) =>
        setComments(
          response.data.listComments.sort((a, b) => a.timestamp - b.timestamp),
        ),
      )
      .catch((error) => console.log(error));
    return;
  }

  //Send new message / comment to the database
  async function handleSendMessage() {
    let timestamp = Date.now();
    const query = `mutation CreateComment {
      createComment(comment: {textID: "${text.id}", authorID: "${user.email}", content: "${input}", timestamp: "${timestamp}"}) {
        id
      }
    }`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({ query }),
    };

    console.log("textID", text.id);

    const res = fetch(`${import.meta.env.VITE_API_URL}`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log("JSON Response parsed");
        console.log("createComment ID:", response.data.createComment.id);

        setComments([
          ...comments,
          {
            authorID: user.email,
            content: input,
            id: response.data.createComment.id,
            textID: text.id,
            timestamp: timestamp,
          },
        ]);
      })
      .catch((error) => console.log(error));

    setInput("");
    return;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // UseEffects
  ////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (text.id !== "" && comments.length === 0) {
      getComments();
    }
  }, [text]);

  ////////////////////////////////////////////////////////////////////////////////
  // Component
  ////////////////////////////////////////////////////////////////////////////////
  return (
    <VStack w={"full"} h={"100%"} justifyContent={"space-between"}>
      <VStack
        bg={"#F9FFF6"}
        w={"full"}
        borderRadius={"15px 15px 0px 0px"}
        justifyContent={"center"}
        p={2}
        borderBottomWidth={"2px"}
        borderColor={"#D8F4C9"}
      >
        <Heading
          size={"xs"}
          color={"#64B53A"}
          pt={".5rem"}
          textAlign={"center"}
        >
          Messages
        </Heading>
      </VStack>

      <VStack w={"full"} h={"full"} overflowY={"scroll"}>
        {comments.length >= 1 &&
          comments.map((comment, i) => {
            return <MessageBubble key={i} message={comment} text={text} />;
          })}
      </VStack>
      <VStack
        h={"11rem"}
        border={"1px solid #A8D491"}
        borderRadius={"0 0 15px 15px"}
        w={"100%"}
        p={"1rem"}
      >
        <Textarea
          borderRadius={"15px"}
          border={".5px solid #5A714D"}
          h={"6rem"}
          focusBorderColor={"transparent"}
          sx={{
            "&:hover": {
              borderColor: "#5A714D",
            },
            "&:focus": {
              borderColor: "#5A714D",
            },
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Box alignSelf={"flex-end"}>
          <Button
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            onClick={() => handleSendMessage()}
            isDisabled={text.id.length < 10}
          >
            <Image src={send} alt="Send message" />
          </Button>
        </Box>
      </VStack>
    </VStack>
  );
}
