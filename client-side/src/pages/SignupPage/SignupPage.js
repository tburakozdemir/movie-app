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
import "./index.css";

const SignupPage = () => {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = (data) => {
    axios({
      method: "post",
      url: "http://localhost:3000/signup",
      data,
    }).then((resp) => {
      if (resp.status === 200) {
        history.push("/login");
      } else {
        console.log("An error occured");
      }
    });
  };

  return (
    <form className="signupWrapper" onSubmit={handleSubmit(handleSignup)}>
      <FormControl id="name">
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="John Doe"
          className={errors.name ? "borderRed" : ""}
          {...register("name", { required: true })}
        />
        {errors.name && (
          <Text mt={3} color="red.500">
            This field is required
          </Text>
        )}
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          className={errors.email ? "borderRed" : ""}
          type="email"
          placeholder="test@gmail.com"
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
          className={errors.password ? "borderRed" : ""}
          type="password"
          placeholder="123456"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <Text mt={3} color="red.500">
            This field is required
          </Text>
        )}
      </FormControl>
      <Box>
        <Button type="submit">Signup</Button>
        <Flex mt={5} alignItems="center">
          <Text fontSize="sm">Have account?</Text>
          <Link to="/login">
            <Text ml={2} fontSize="sm" as="i" fontWeight="bold">
              Login.
            </Text>
          </Link>
        </Flex>
      </Box>
    </form>
  );
};

export default SignupPage;
