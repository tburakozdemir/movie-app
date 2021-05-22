import { Avatar, Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router";
import "./index.css";

const TopNav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const history = useHistory();

  const toggleDropdownMenu = () => {
    setToggleDropdown((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthed");
    localStorage.removeItem("userId");
    window.location.reload();
    history.push("/login");
  };

  return (
    <Box className="topNav" background="gray.800">
      <Flex justifyContent="flex-end" maxWidth="90%">
        <Box position="relative">
          <Avatar
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            onClick={toggleDropdownMenu}
            cursor="pointer"
          />
          {toggleDropdown && (
            <Box className="dropdown">
              <Button onClick={handleLogout}>Logout</Button>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default TopNav;
