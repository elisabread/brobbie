import { Box, Heading, VStack, Image, HStack, Spinner } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import MyDocItem from "../comps/MyDocItem";
import BrobbieDocItem from "../comps/BrobbieDocItem";
import { userContext } from "../utils/userContext";
import sadpear from "../assets/icons/sadpear.svg";

export default function ListDocs() {
  const [user, setUser] = useContext(userContext);
  const [myList, setMyList] = useState([]);
  const [brobbieList, setBrobbieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getList() {
    const query = `query MyQuery {
      listTexts {
        collaborator
        company
        content
        creator
        id
        jobApplyUrl
        jobDesc
        jobTitle
        title
      }
    }
    `;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({ query }),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}`,
        requestOptions,
      );
      const responseData = await response.json();
      // Filter documents based on the logged-in user's ID
      const userDocs = responseData.data.listTexts.filter(
        (doc) => doc.creator === user.email,
      );
      const brobbieDocs = responseData.data.listTexts.filter(
        (doc) => doc.collaborator === user.email,
      );
      setMyList(userDocs);
      setBrobbieList(brobbieDocs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  console.log(myList);

  return (
    <VStack alignItems={"flex-start"} pb={"3rem"}>
      <Box pb={"3rem"}>
        <Heading size={"md"} pb={"1rem"} color={"#5A714D"}>
          My Documents
        </Heading>
        <VStack
          bg={"white"}
          borderRadius={"15px"}
          px={"3rem"}
          py={"1rem"}
          width={"75vw"}
          maxW={"60rem"}
          alignItems={"flex-start"}
          gap={6}
        >
          {isLoading ? (
            <Spinner />
          ) : myList && myList.length > 0 ? (
            myList.map((doc) => <MyDocItem key={doc.id} doc={doc} />)
          ) : (
            <HStack padding={6}>
              <Image src={sadpear} alt="sad pear icon" />
              <Heading size={"md"}>
                You don't currently have any created documents.
              </Heading>
            </HStack>
          )}
        </VStack>
      </Box>
      <Box>
        <Heading size={"md"} pb={"1rem"} color={"#5A714D"}>
          Brobbie's Documents
        </Heading>
        <VStack
          bg={"white"}
          borderRadius={"15px"}
          px={"3rem"}
          py={"1rem"}
          width={"75vw"}
          maxW={"60rem"}
          alignItems={"flex-start"}
          gap={6}
        >
          {isLoading ? (
            <Spinner />
          ) : brobbieList && brobbieList.length > 0 ? (
            brobbieList.map((doc) => <BrobbieDocItem key={doc.id} doc={doc} />)
          ) : (
            <HStack padding={6}>
              <Image src={sadpear} alt="sad pear icon" />
              <Heading size={"md"}>
                You are currently not invited to help with a document.
              </Heading>
            </HStack>
          )}
        </VStack>
      </Box>
    </VStack>
  );
}
