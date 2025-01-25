import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

import Divider from "../../components/divider";

const list = [
  { productName: "Automic Habbit", imagePath: "/img/atomicH.jpeg" },
  { productName: "Deep Work", imagePath: "/img/deep_work.jpeg" },
  { productName: "Self Improve", imagePath: "/img/test.webp" },
  { productName: "Biography", imagePath: "/img/test2.webp" },
  { productName: "Automic Habbit", imagePath: "/img/Atomic.jpeg" },
  { productName: "Deep Work", imagePath: "/img/deep_work_A.jpeg" },
];

export default function NewBooks() {
  return (
    <div className={"new-books-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>New Books</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {list.length !== 0 ? (
                list.map((ele, index) => {
                  return (
                    <Card key={index} variant="outlined" className={"card"}>
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={ele.imagePath} alt="" className={"img"} />
                        </AspectRatio>
                        <div className={"product-sale"}>Normal size</div>
                        <div className={"product-sale"}>Add to Cart</div>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className={"info"}>
                          <Stack className={"row"}>
                            <Typography className={"title"}>
                              {ele.productName}
                            </Typography>

                            <Typography className={"title"}>
                              Book Author
                              <Typography className={"views"}>
                                <TurnedInIcon
                                  sx={{ fontSize: 20, marginLeft: "5px" }}
                                />
                              </Typography>
                            </Typography>
                            <Divider width="27" height="2" bg="#d9d9d9" />
                            <Typography className={"information"}>
                              "Atomic Habits" shows how small, consistent
                              changes lead to big
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack className={"small-info"}>
                          <Typography className={"price"}>$12</Typography>
                          <Divider width="27" height="2" bg="#d9d9d9" />
                          <Typography className={"views"}>
                            10
                            <FavoriteIcon
                              sx={{ fontSize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                          <Divider width="27" height="2" bg="#d9d9d9" />
                          <Typography className={"views"}>
                            20
                            <VisibilityIcon
                              sx={{ fontSize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data"> New product are not available! </Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
