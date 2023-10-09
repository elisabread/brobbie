import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { textContext } from "../utils/textContext";

const ShareButton = () => {
  const { docId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState();
  const [loading, setLoading] = useState();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [text, setText] = useContext(textContext);

  async function inviteBrobbie() {
    setLoading(true);
    console.log("Text in sharebutton", text);
    const variables = {
      collaborator: input,
      id: text.id,
      creator: text.creator,
      jobDesc: text.jobDesc,
      jobTitle: text.jobTitle,
      company: text.company,
      content: text.content,
      title: text.title,
    };

    const query = `
      mutation UpdateText($collaborator: String!, $id: ID!, $creator: String!, $jobDesc: String!, $jobTitle: String!, $company: String!, $content: String!, $title: String!) {
        updateText(
          id: $id,
          text: {
            creator: $creator, 
            jobDesc: $jobDesc, 
            jobTitle: $jobTitle, 
            company: $company, 
            collaborator: $collaborator, 
            content: $content, 
            title: $title
          }
        ) {
          id
        }
      }
    `;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({ query, variables }),
    };

    const res = fetch(`${import.meta.env.VITE_API_URL}`, requestOptions)
      .then((response) => response.json())
      .then(() =>
        setText({
          ...text,
          collaborator: input,
        }),
      )
      .then(() => onClose())
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
    return;
  }

  return (
    <>
      <Button
        bg={"#64B53A"}
        color={"white"}
        borderRadius={"25px"}
        onClick={onOpen}
        sx={{
          "&:hover": {
            bg: "#549D2E",
          },
        }}
        isDisabled={text.id.length < 10}
      >
        Share
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          borderWidth={"2px"}
          borderColor={"#D8F4C9"}
          borderRadius={"20px"}
          bgColor={"#F9FFF6"}
        >
          <ModalHeader
            borderBottomWidth={"2px"}
            borderColor={"#D8F4C9"}
            borderRadius={"20px 20px 0px 0px"}
            bg={"white"}
            color={"#64B53A"}
            py={8}
          >
            Invite a Brobbie
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontWeight={"bold"}>
                Please enter the helper's email adress:
              </FormLabel>
              <Input
                bg={"white"}
                borderRadius={"15px"}
                onChange={(e) => setInput(e.target.value)}
                ref={initialRef}
                placeholder="Email"
              />
              <Text mt={10}>
                Brobbies can help you write or just share some great advice!
              </Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              color={"white"}
              bg={"#64B53A"}
              mr={3}
              onClick={() => inviteBrobbie()}
              isDisabled={loading}
              borderRadius={"20px"}
              px={10}
            >
              Send
            </Button>
            <Button borderRadius={"20px"} px={8} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareButton;
