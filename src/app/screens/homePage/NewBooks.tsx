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
import { CartItem } from "../../../lib/types/search";
import { useHistory } from "react-router-dom";

interface ChosenProductsProps {
  onAdd: (item: CartItem) => void;
}

//** REDUX SLICE & SELECTOR **//
const newBooksRetriever = createSelector(retrieveNewBooks, (newBooks) => ({
  newBooks,
}));

export default function NewBooks(props: ChosenProductsProps) {
  const { onAdd } = props;
  const { newBooks } = useSelector(newBooksRetriever);
  const history = useHistory();

  //**Handlers */
  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
    console.log("one:", id);
  };

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
                        <AspectRatio
                          ratio="1"
                          onClick={() => chooseDishHandler(product._id)}
                        >
                          <img src={imagePath} alt="" className={"img"} />
                        </AspectRatio>
                        <div className={"product-sale"}>
                          {`${product.productSize}`}
                        </div>
                        <div
                          className={"product-sale"}
                          onClick={(e) => {
                            console.log("Button Press");
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          Add To Cart
                        </div>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className={"info"}>
                          <Stack className={"row"}>
                            <Typography
                              className={"title"}
                              onClick={() => chooseDishHandler(product._id)}
                            >
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
