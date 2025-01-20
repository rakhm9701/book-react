import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";


const list = [
  { productName: "Automic Habbit", imagePath: "/img/child1.jpeg" },
  { productName: "Deep Work", imagePath: "/img/child2.jpeg" },
  { productName: "Self Improve", imagePath: "/img/child3.jpeg" },
  { productName: "Biography", imagePath: "/img/child4.jpeg" },
  { productName: "Automic Habbit", imagePath: "/img/child5.jpeg" },
  { productName: "Deep Work", imagePath: "/img/child2.jpeg" },
];

export default function Children() {
  return (
    <div className={"popular-children-frame"}>
      <Container>
        <Stack className={"popular-section"}>
          <Box className={"category-title"}>Kids BestSellers</Box>

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
                          flexDirection={"column"}
                          justifyContent={"space-between"}
                        >
                          <Typography textColor="neutral.300">
                            $3.99 old price
                          </Typography>
                          <Typography textColor="neutral.300">
                            from $3.99
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
                        <Typography
                          level="h4"
                          font-size="lg"
                          textColor="#fff"
                          mb={1}
                        >
                          {ele.productName}
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
