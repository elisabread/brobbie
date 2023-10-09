import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Heading,
  IconButton,
  Input,
  Textarea,
  VStack,
  Text,
  HStack,
  Box,
  Center,
  Image,
  FormLabel,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/photos/ikealogo.png";
import edit from "../assets/icons/edit.svg";
import { textContext } from "../utils/textContext";

export default function JobDisplay() {
  const [showForm, setShowForm] = useState(false);
  const [showJobDescription, setShowJobDescription] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [text, setText] = useContext(textContext);

  async function addJobToText() {
    console.log(text);
    console.log(jobTitle);
    console.log(jobDesc);
    console.log(company);

    const variables = {
      content: text.content,
      jobDesc: jobDesc,
    };

    const query = `mutation UpdateText($content: String, $jobDesc: String) {
        updateText(id: "${text.id}",text: {creator: "${text.creator}", jobDesc: $jobDesc, jobTitle: "${jobTitle}", company: "${company}", collaborator: "${text.collaborator}", content: $content, title: "${text.title}"}) {
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
      .then(
        setText({
          collaborator: text.collaborator,
          content: text.content,
          creator: text.creator,
          id: text.id,
          title: text.title,
          jobTitle: jobTitle,
          company: company,
          jobDesc: jobDesc,
        }),
      )
      .then(setShowForm(false))
      .catch((error) => console.log(error));
    return;
  }

  useEffect(() => {
    if (text.jobTitle) {
      setJobTitle(text.jobTitle);
      setCompany(text.company);
      setJobDesc(text.jobDesc);
    }
  }, [text]);

  return (
    <VStack
      gap={0}
      alignItems={"flex-start"}
      px={"1rem"}
      pt={".5rem"}
      pb={"2rem"}
    >
      <Box alignSelf={"flex-end"} pb={".5rem"}>
        {showForm ? (
          <IconButton
            aria-label="Close Form"
            icon={<CloseIcon />}
            size="xs"
            bg="#64B53A"
            color="white"
            onClick={() => setShowForm(false)}
            sx={{
              "&:hover": {
                bg: "#549D2E",
              },
            }}
          />
        ) : (
          <IconButton
            aria-label="Add Job"
            icon={<EditIcon />}
            size="xs"
            bg="#64B53A"
            color="white"
            onClick={() => setShowForm(true)}
            sx={{
              "&:hover": {
                bg: "#549D2E",
              },
            }}
          />
        )}
      </Box>
      {!jobTitle !== "" && !showForm && (
        <Heading
          textAlign={"center"}
          size={"sm"}
          pl={"4rem"}
          pr={"3rem"}
          color={"#64B53A"}
        >
          Job Information
        </Heading>
      )}
      {showForm ? (
        <>
          <Heading
            textAlign={"center"}
            size={"sm"}
            pl={"4rem"}
            pr={"3rem"}
            color={"#64B53A"}
          >
            Job Information
          </Heading>
          <Box pt={"2rem"}>
            <form>
              <VStack alignItems={"flex-start"} gap={4}>
                <Box>
                  <FormLabel fontWeight={"600"}>Company</FormLabel>
                  <Input
                    placeholder={company}
                    onChange={(e) => setCompany(e.target.value)}
                    border={"1px solid var(--pastel-green, #D8F4C9)"}
                    borderRadius={"25px"}
                    boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset"}
                    bg={"rgba(255, 255, 255, 0.50"}
                    isRequired
                    focusBorderColor={"#64B53A"}
                  />
                </Box>
                <Box>
                  <FormLabel fontWeight={"600"}>Job title</FormLabel>
                  <Input
                    placeholder={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    border={"1px solid var(--pastel-green, #D8F4C9)"}
                    borderRadius={"25px"}
                    boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset"}
                    bg={"rgba(255, 255, 255, 0.50"}
                    isRequired
                    focusBorderColor={"#64B53A"}
                  />
                </Box>
                <Box>
                  <FormLabel fontWeight={"600"}>Job description</FormLabel>
                  <Textarea
                    className="custom-textarea"
                    resize={"none"}
                    placeholder={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    border={"1px solid var(--pastel-green, #D8F4C9)"}
                    borderRadius={"25px"}
                    boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset"}
                    bg={"rgba(255, 255, 255, 0.50"}
                    isRequired
                    focusBorderColor={"#64B53A"}
                  ></Textarea>
                </Box>
                <Box alignSelf={"flex-end"}>
                  <Button
                    bg={"#64B53A"}
                    color={"white"}
                    borderRadius={"25px"}
                    sx={{
                      "&:hover": {
                        bg: "#549D2E",
                      },
                    }}
                    onClick={() => addJobToText()}
                    isDisabled={text.id === ""}
                  >
                    Save
                  </Button>
                </Box>
              </VStack>
            </form>
          </Box>
        </>
      ) : jobTitle !== "" ? (
        <VStack alignItems={"flex-start"} w={"100%"} pt={"2rem"}>
          <VStack alignItems="center" width={"100%"} pb={"1rem"} gap={"0"}>
            <Text color={"#5A714D"} fontWeight={"600"}>
              {company}
            </Text>
            <Text fontWeight={"600"} fontSize={"1.2rem"}>
              {jobTitle}
            </Text>
          </VStack>
          {showJobDescription ? (
            <>
              <Text pb={"1rem"}>{jobDesc}</Text>
              <Box alignSelf={"center"}>
                <Button
                  size="sm"
                  bg={"#64B53A"}
                  color={"white"}
                  borderRadius={"15px"}
                  rightIcon={<ChevronUpIcon />}
                  onClick={() => setShowJobDescription(false)}
                  sx={{
                    "&:hover": {
                      bg: "#549D2E",
                    },
                  }}
                >
                  Read less
                </Button>
              </Box>
            </>
          ) : (
            <Box alignSelf={"center"}>
              <Button
                size="sm"
                bg={"#64B53A"}
                color={"white"}
                borderRadius={"15px"}
                rightIcon={<ChevronDownIcon />}
                onClick={() => setShowJobDescription(true)}
                sx={{
                  "&:hover": {
                    bg: "#549D2E",
                  },
                }}
              >
                Read more
              </Button>
            </Box>
          )}
        </VStack>
      ) : null}
    </VStack>
  );
}
