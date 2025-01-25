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
import Divider from "../../components/divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

const list = [
  { productName: "Automic Habbit", imagePath: "/img/atomicH.jpeg" },
  { productName: "Deep Work", imagePath: "/img/deep_work.jpeg" },
  { productName: "Self Improve", imagePath: "/img/test.webp" },
  { productName: "Biography", imagePath: "/img/test2.webp" },
  { productName: "Automic Habbit", imagePath: "/img/Atomic.jpeg" },
  { productName: "Deep Work", imagePath: "/img/deep_work_A.jpeg" },
  { productName: "Automic Habbit", imagePath: "/img/Atomic.jpeg" },
  { productName: "Deep Work", imagePath: "/img/deep_work_A.jpeg" },
  { productName: "Automic Habbit", imagePath: "/img/Atomic.jpeg" },
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
                      <CardContent
                        sx={{ justifyContent: "flex-end" }}
                      ></CardContent>

                      <CardOverflow
                        className={"detail-part"}
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          py: 0.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px",
                        }}
                      >
                        <Typography
                          className={"name"}
                          level="h3"
                          font-size="lg"
                          textColor="#fff"
                          mb={1}
                        >
                          {ele.productName}
                        </Typography>
                        <Divider width="27" height="2" bg="#d9d9d9" />

                        <Typography
                          className={"author"}
                          textColor="neutral.300"
                        >
                          Lois Lowrey
                        </Typography>
                        <Divider width="27" height="2" bg="#d9d9d9" />

                        <Typography className={"price"} textColor="neutral.300">
                          from $3.99
                        </Typography>
                        <Divider width="27" height="2" bg="#d9d9d9" />
                        <Stack className={"view"}>
                          <Typography className={"views"}>
                            10
                            <FavoriteIcon
                              sx={{ fontSize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                          <Typography className={"views"}>
                            20
                            <VisibilityIcon
                              sx={{ fontSize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
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
