import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { userContext } from "../utils/userContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useContext(userContext);
  const [input, setInput] = useState();
  const navigate = useNavigate();

  function handleLogin() {
    if (input !== "") {
      setUser({ email: input });
      navigate("/list");
    }
  }

  return (
    <HStack h={"100vh"} justifyContent={"center"}>
      <FormControl>
        <FormLabel>Enter your Email address</FormLabel>
        <Input
          type="email"
          bg={"white"}
          onChange={(e) => setInput(e.target.value)}
          focusBorderColor="#64B53A"
        />
        <FormHelperText>
          Dont worry! No password is needed for this test app.
        </FormHelperText>
        <Button
          color={"white"}
          bg={"#64B53A"}
          mt={10}
          onClick={() => handleLogin()}
        >
          Start collaborating
        </Button>
      </FormControl>
    </HStack>
  );
};

export default Login;
