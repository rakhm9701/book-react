import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;

  background: rgb(229, 229, 229);
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "94px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              <img width={"100px"} src={"/icons/booksaw.svg"} />
            </Box>
            <Box className={"foot-desc-txt"}>
              THE BOOK DISCUSSES THE CHANGES IN SOCIETY AND THE WAY YOUNG PEOPLE
              ADAPT TO MODERN DEMANDS. IT HIGHLIGHTS HOW TO NAVIGATE SOCIAL AND
              CULTURAL CHANGES AND THE FACTORS NECESSARY FOR THE GROWTH OF THE
              NEW GENERATION.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} />
              <img src={"/icons/twitter.svg"} />
              <img src={"/icons/instagram.svg"} />
              <img src={"/icons/youtube.svg"} />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>CATEGORIES</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">HOME</Link>
                  <Link to="/products">PRODUCTS</Link>
                  {authMember && <Link to="/orders">ORDERS</Link>}
                  <Link to="/help">HELP</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>HELP</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <div>HELP CENTER</div>
                  </Box>
                  <Box className={"find-us"}>
                    <div>REPORT A PROBLEM</div>
                  </Box>
                  <Box className={"find-us"}>
                    <div>SUGGESTING ERRORS</div>
                  </Box>
                  <Box className={"find-us"}>
                    <div>CONTACT US</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>FIND US</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>DOWNTOWN, DAEJEON</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+8210 8282 9898</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>BOOK@GMAIL.COM</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span>
                    <div>VISIT 24 HOURS</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © COPYRIGHTS DEVEX GLOBAL, ALL RIGHTS RESERVED.
        </Stack>
      </Container>
    </Footers>
  );
}
