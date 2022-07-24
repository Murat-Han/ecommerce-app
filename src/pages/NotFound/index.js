import React from "react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import GoBackButton from "../../components/GoBackButton";

function NotFound() {
  return (
    <div>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        m={5}
        width="97vw"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Page is not found!
        </AlertTitle>
        <AlertDescription fontSize="lg">Error - 404</AlertDescription>
        <GoBackButton />
      </Alert>
    </div>
  );
}

export default NotFound;
