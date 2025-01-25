import react from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className={"info"}>
          <Divider height="120" width="4" bg="#A09D9D" />
          <Stack className={"static-box"}>
            <Box>
              <img src="/icons/1.svg" alt="" className={"static-pic"} />
            </Box>
            <Box className={"static-text"}>Books</Box>
          </Stack>
          <Divider height="120" width="4" bg="#A09D9D" />
          <Stack className={"static-box"}>
            <Box>
              <img src="/icons/2.svg" alt="" className={"static-pic"} />
            </Box>
            <Box className={"static-text"}>BookStore</Box>
          </Stack>
          <Divider height="120" width="4" bg="#A09D9D" />
          <Stack className={"static-box"}>
            <Box>
              <img src="/icons/3.svg" alt="" className={"static-pic"} />
            </Box>
            <Box className={"static-text"}>BookDoor</Box>
          </Stack>
          <Divider height="120" width="4" bg="#A09D9D" />
          <Stack className={"static-box"}>
            <Box>
              <img src="/icons/4.svg" alt="" className={"static-pic"} />
            </Box>
            <Box className={"static-text"}>Library</Box>
          </Stack>
          <Divider height="120" width="4" bg="#A09D9D" />
          <Stack className={"static-box"}>
            <Box>
              <img src="/icons/5.svg" alt="" className={"static-pic"} />
            </Box>
            <Box className={"static-text"}>Flaprise</Box>
          </Stack>
          <Divider height="120" width="4" bg="#A09D9D" />
        </Stack>
      </Container>
    </div>
  );
}
