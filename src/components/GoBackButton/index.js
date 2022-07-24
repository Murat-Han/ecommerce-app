import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@chakra-ui/react";
import {TiArrowBack } from "react-icons/ti";

function GoBack() {

  let navigate = useNavigate();
  const goToPreviousPath = () => {
    navigate(-1);
  };
  return (
    <div>
      <Button mt={5} onClick={goToPreviousPath} colorScheme="blackAlpha" leftIcon={<TiArrowBack/>}>
        Go Back
      </Button>
    </div>
  );
}

export default GoBack;
