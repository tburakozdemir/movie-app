import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import "./style.css";

const LoginPage = () => {
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    axios({
      method: "post",
      url: "http://localhost:3000/login",
      data,
    }).then((resp) => {
      if (resp.status === 200) {
        localStorage.setItem("isAuthed", true);
        localStorage.setItem("userId", resp.data.userId);
        window.location.reload();
        history.push("/home");
      } else {
        console.log("An error occured");
      }
    });
  };

  return (
    <form className="loginWrapper" onSubmit={handleSubmit(handleLogin)}>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="test@gmail.com"
          className={errors.email ? "borderRed" : ""}
          {...register("email", { required: true })}
        />
        {errors.email && (
          <Text mt={3} color="red.500">
            This field is required
          </Text>
        )}
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="123456"
          className={errors.password ? "borderRed" : ""}
          {...register("password", { required: true })}
        />
        {errors.password && (
          <Text mt={3} color="red.500">
            This field is required
          </Text>
        )}
      </FormControl>
      <Box>
        <Button type="submit">Login</Button>
        <Flex mt={5} alignItems="center">
          <Text fontSize="sm">Don't have account?</Text>
          <Link to="/signup">
            <Text ml={2} fontSize="sm" as="i" fontWeight="bold">
              Signup.
            </Text>
          </Link>
        </Flex>
      </Box>
    </form>
  );
};

export default LoginPage;
