import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const list = [
  { productName: "Automic Habbit", imagePath: "/img/atomicH.jpeg" },
  { productName: "Deep Work", imagePath: "/img/deep_work.jpeg" },
  { productName: "Self Improve", imagePath: "/img/test.webp" },
  { productName: "Biography", imagePath: "/img/test2.webp" },
  { productName: "Automic Habbit", imagePath: "/img/Atomic.jpeg" },
  { productName: "Deep Work", imagePath: "/img/deep_work_A.jpeg" },
];

export default function PopularBooks() {
  return (
    <div className={"popular-dishes-frame"}>
      <Container>
        <Stack className={"popular-section"}>
          <Box className={"category-title"}>This Month BestSellers</Box>
          <Stack className={"cards-frame"}>
            {list.length !== 0 ? (
              list.map((ele, index) => {
                return (
                  <CssVarsProvider key={index}>
                    <Card className={"card"}>
                      <CardCover>
                        <img
                          src={ele.imagePath}
                          alt=""
                          className={"card-img"}
                        />
                      </CardCover>
                      <CardCover className={"card-cover"} />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                        >
                          <Typography
                            level="h3"
                            font-size="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {ele.productName}
                          </Typography>
                        </Stack>
                      </CardContent>
                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          py: 0.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px",
                        }}
                      >
                        <Typography textColor="neutral.300">
                          Lois Lowrey
                        </Typography>
                        <Typography textColor="neutral.300">
                          from $3.99
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data"> New product are not available! </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
