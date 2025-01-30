import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import Divider from "../../components/divider";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewBooks } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";


//** REDUX SLICE & SELECTOR **//
const newBooksRetriever = createSelector(retrieveNewBooks, (newBooks) => ({
  newBooks,
}));



export default function NewBooks() {
  const { newBooks } = useSelector(newBooksRetriever);
  console.log("newDishes:", newBooks);

  return (
    <div className={"new-books-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>New Books</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newBooks.length !== 0 ? (
                newBooks.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  // product.productCollection === ProductCollection.CHILDREN
                  //   ? product.productVolume + "l"
                  //   : product.productSize + "size";
                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className={"card"}
                    >
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" className={"img"} />
                        </AspectRatio>
                        <div className={"product-sale"}>
                          {`${product.productSize}`}
                        </div>
                        <Button
                          className={"product-sale"}
                         
                        >
                          Add to Cart
                        </Button>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className={"info"}>
                          <Stack className={"row"}>
                            <Typography className={"title"}>
                              {product.productName}
                            </Typography>

                            <Typography className={"title"}>
                              {product.productAuthor}
                              <Typography className={"views"}>
                                <TurnedInIcon
                                  sx={{ fontSize: 20, marginLeft: "5px" }}
                                />
                              </Typography>
                            </Typography>
                            <Divider width="27" height="2" bg="#d9d9d9" />
                            <Typography className={"information"}>
                              {`${product.productDesc}`}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack className={"small-info"}>
                          <Typography className={"price"}>
                            ${`${product.productPrice}`}
                          </Typography>
                          <Divider width="27" height="2" bg="#d9d9d9" />
                          <Typography className={"views"}>
                            {`${product.productLikes}`}
                            <FavoriteIcon
                              sx={{ fontSize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                          <Divider width="27" height="2" bg="#d9d9d9" />
                          <Typography className={"views"}>
                            {`${product.productViews}`}
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
