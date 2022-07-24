import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Badge } from "@chakra-ui/react";

import { IoLogOut } from "react-icons/io5";
import { FaUserPlus, FaUser,FaShoppingCart, FaUserCog, FaUserCircle } from "react-icons/fa";

import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

import styles from "./styles.module.css";

function Navbar({ history }) {
  const { isLoggedIn, handleLogout, user } = useAuth();
  const { items } = useCart();

  const logoutAndDirect = () => {
    handleLogout(() => {
      history.push("/");
    });
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">eCommerce</Link>
        </div>
        <div className={styles.menu}>
          <Link to="/products">Products</Link>
        </div>
      </div>
      <div className={styles.right}>
      <Box
              mr={1}
              width="280px"
              height="7vh"
              alignItems="flex-end"
              display="flex"
              justifyContent="center"
            >
              <Link to="/cart">
                <Box display="flex" flexDirection="column">
                  <Badge
                    mb={1}
                    ml={1}
                    color="#006994"
                    fontSize="0.9em"
                    fontWeight="bold"
                    Type="solid"
                    bgColor="white"
                  >
                    {items.length === 0 ? "" : `(${items.length})`}
                  </Badge>
                  <FaShoppingCart color="#006994" fontSize="30" />
                </Box>
              </Link>
        {!isLoggedIn && (
          <>
              <Link to="/signin">
                <Button colorScheme="blue" ml={2} leftIcon={<FaUser />}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  colorScheme="blue"
                  ml={2}
                  variant="outline"
                  leftIcon={<FaUserPlus />}
                >
                  Register
                </Button>
              </Link>
          </>
        )}
        {isLoggedIn &&
          (user?.role === "admin" ? (
            <>
              <Link to="/admin">
                <Button
                  colorScheme="blue"
                  variant="outline"
                  ml={2}
                  leftIcon={<FaUserCog />}
                >
                  Admin
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <Button
                  colorScheme="blue"
                  variant="outline"
                  ml={2}
                  leftIcon={<FaUserCircle />}
                >
                  Profile
                </Button>
              </Link>
            </>
          ))}
        {isLoggedIn && (
          <>
            <Link to="/products">
              <Button
                colorScheme="blue"
                onClick={logoutAndDirect}
                ml={2}
                leftIcon={<IoLogOut />}
              >
                Log Out
              </Button>
            </Link>
          </>
        )}
        </Box>
      </div>
    </nav>
  );
}

export default Navbar;
