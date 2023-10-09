import {
  HStack,
  VStack,
  Input,
  ButtonGroup,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useEffect, useState, useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
import JobDisplay from "../comps/JobDisplay";
import Chat from "../comps/Chat";
import ShareButton from "../comps/ShareButton";
import { userContext } from "../utils/userContext";
import { textContext } from "../utils/textContext";

export default function Texteditor() {
  ////////////////////////////////////////////////////////////////////////////////
  // Constants
  ////////////////////////////////////////////////////////////////////////////////
  const { docId } = useParams();
  const [textContent, setTextContent] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [user, setUser] = useContext(userContext);
  const editorRef = useRef(null);
  const [value, setValue] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  //Text useContext
  const [text, setText] = useState({
    content: "",
    creator: user.email,
    id: "",
    title: "Untitled",
    collaborator: "",
    jobTitle: "",
    company: "",
    jobDesc: "",
  });

  ////////////////////////////////////////////////////////////////////////////////
  // Functions
  ////////////////////////////////////////////////////////////////////////////////
  async function getDocument(id) {
    const query = `query ListText {
      listText(id: "${id}") {
        creator
        id
        content
        title
        collaborator
        company
        jobTitle
        jobDesc
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
      .then((response) => setText(response.data.listText))
      .catch((error) => console.log(error));
    return;
  }

  async function createText() {
    setIsSaving(true);
    const variables = {
      content: value,
    };
    const query = `
    mutation CreateText($content: String!) {
        createText(
          text: {
            creator: "${user.email}", 
            jobDesc: "${text.jobDesc}", 
            jobTitle: "${text.jobTitle}", 
            company: "${text.company}", 
            collaborator: "${text.collaborator}", 
            content: $content, 
            title: "${textTitle}"
          })
            {
          id
        }
    }`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({
        query: query,
        variables,
      }),
    };

    const res = fetch(`${import.meta.env.VITE_API_URL}`, requestOptions)
      .then((response) => response.json())
      .then((response) =>
        setText({
          ...text,
          id: response.data.createText.id,
          title: textTitle,
          content: value,
          creator: user.email,
        }),
      )
      .then(() => setIsSaving(false))
      .then(() =>
        toast({
          title: "Wohoo!",
          description: "You have saved the document for the first time!",
          status: "success",
          duration: 9000,
          isClosable: true,
        }),
      )
      .catch((error) => console.log(error));

    return;
  }

  async function updateText() {
    setIsSaving(true);

    const variables = {
      content: value,
      jobDesc: text.jobDesc,
    };
    const query = `
    mutation UpdateText($content: String!, $jobDesc: String) {
        updateText(
          id: "${text.id}",
          text: {
            creator: "${text.creator}", 
            jobDesc: $jobDesc, 
            jobTitle: "${text.jobTitle}", 
            company: "${text.company}", 
            collaborator: "${text.collaborator}", 
            content: $content, 
            title: "${textTitle}"
          })
            {
          id
        }
    }`;

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
      .then((response) =>
        setText({
          ...text,
          title: textTitle,
          content: value,
        }),
      )
      .then(() => setIsSaving(false))
      .then(() =>
        toast({
          title: "Saved!",
          description: "You have saved the document sucessfully!",
          status: "success",
          duration: 9000,
          isClosable: true,
        }),
      )
      .catch((error) => console.log(error));
    return;
  }
  async function saveDocument() {
    //If the text does not exist in the database
    if (text.id.length > 10) {
      //If the text already exists in the database
      await updateText();
    } else {
      await createText();
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  // UseEffects
  ////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function callGetDocument() {
      await getDocument(docId);
      setTextTitle(text.title);
      setTextContent(text.content);
    }
    callGetDocument();
  }, []);

  useEffect(() => {
    setTextTitle(text.title);
    setTextContent(text.content);
  }, [text]);

  ////////////////////////////////////////////////////////////////////////////////
  // Component
  ////////////////////////////////////////////////////////////////////////////////
  return (
    <textContext.Provider value={[text, setText]}>
      <HStack
        w={"full"}
        h={"full"}
        alignItems={"start"}
        justifyContent={"center"}
        pb={"3rem"}
      >
        <VStack w={"65%"} h={"full"} justifyContent={"center"} ml={5}>
          <HStack w={"full"} justifyContent={"space-between"}>
            <Input
              fontWeight={"semibold"}
              bg={"white"}
              width={"full"}
              borderRadius={"15px"}
              borderColor={"white"}
              value={textTitle}
              focusBorderColor="#64B53A"
              onChange={(e) => setTextTitle(e.target.value)}
            />
            <ButtonGroup ml={6}>
              <ShareButton text={text} />
              <Button
                bg={"white"}
                color={"#64B53A"}
                borderRadius={"25px"}
                sx={{
                  "&:hover": {
                    bg: "rgba(87, 255, 0, 0.20)",
                  },
                }}
                onClick={() => saveDocument()}
                isLoading={isSaving}
              >
                Save
              </Button>
            </ButtonGroup>
          </HStack>
          <VStack w={"full"} gap={"0"} alignItems={"flex-start"}>
            <Editor
              apiKey={import.meta.env.VITE_TINY_TEXT_EDITOR_API_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={
                text.content ? `${text.content}` : "Let's start writing!"
              }
              init={{
                width: "100%",
                height: "70vh",
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(newValue, editor) => setValue(newValue)}
            />
          </VStack>
        </VStack>
        <VStack w={"17rem"} h={"full"} ml={"2rem"} gap={"5"}>
          <Box borderRadius={"15px"} w={"full"} bg={"#F9FFF6"}>
            <JobDisplay />
          </Box>
          <Box w={"full"} h={"35rem"} bg={"#F9FFF6"} borderRadius={"15px"}>
            <Chat text={text} />
          </Box>
        </VStack>
      </HStack>
    </textContext.Provider>
  );
}
