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
              <img src="/img/adventure.jpg" alt="" className={"static-pic"} />
            </Box>
            <Box className={"static-text"}>Adventure</Box>
          </Stack>
          <Divider height="120" width="4" bg="#A09D9D" />
          <Stack className={"static-box"}>
            <Box>
              <img src="/img/children.jpg" alt="" className={"static-pic"} />
            </Box>
            <Box className={"static-text"}>Children</Box>
          </Stack>
          <Divider height="120" width="4" bg="#A09D9D" />
          <Stack className={"static-box"}>
            <Box>
              <img src="/img/history.jpeg" alt="" className={"static-pic"} />
            </Box>
            <Box className={"static-text"}>Historical</Box>
          </Stack>
          <Divider height="120" width="4" bg="#A09D9D" />
          <Stack className={"static-box"}>
            <Box>
              <img src="/img/fantasy.webp" alt="" className={"static-pic"} />
            </Box>
            <Box className={"static-text"}>Fantasy</Box>
          </Stack>
          <Divider height="120" width="4" bg="#A09D9D" />
          <Stack className={"static-box"}>
            <Box>
              <img src="/img/self.jpeg" alt="" className={"static-pic"} />
            </Box>
            <Box className={"static-text"}>Self Help</Box>
          </Stack>
          <Divider height="120" width="4" bg="#A09D9D" />
        </Stack>
      </Container>
    </div>
  );
}
