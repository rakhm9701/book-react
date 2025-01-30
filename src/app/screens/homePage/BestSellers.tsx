import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveBestSellers } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

//** REDUX SLICE & SELECTOR **//
const bestSellersRetriever = createSelector(
  retrieveBestSellers,
  (bestSellers) => ({ bestSellers })
);

export default function PopularBooks() {
  const { bestSellers } = useSelector(bestSellersRetriever);

  return (
    <div className={"popular-dishes-frame"}>
      <Container>
        <Stack className={"popular-section"}>
          <Box className={"category-title"}>This Month BestSellers</Box>
          <Stack className={"cards-frame"}>
            {bestSellers.length !== 0 ? (
              bestSellers.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Card className={"card"}>
                      <CardCover>
                        <img src={imagePath} alt="" className={"card-img"} />
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
                          level="h4"
                          font-size="lg"
                          textColor="#fff"
                          mb={1}
                        >
                          {product.productName}
                        </Typography>
                        <Divider width="27" height="2" bg="#d9d9d9" />

                        <Typography
                          className={"author"}
                          textColor="neutral.300"
                        >
                          {product.productAuthor}
                        </Typography>
                        <Divider width="27" height="2" bg="#d9d9d9" />

                        <Typography className={"price"} textColor="neutral.300">
                          ${product.productPrice}
                        </Typography>
                        <Divider width="27" height="2" bg="#d9d9d9" />
                        <Stack className={"view"}>
                          <Typography className={"views"}>
                            {product.productLikes}
                            <FavoriteIcon
                              sx={{ fontSize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                          <Typography className={"views"}>
                            {product.productViews}
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
