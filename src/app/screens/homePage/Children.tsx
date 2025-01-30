import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveKidsBooks } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";


//** REDUX SLICE & SELECTOR **//
const kidsBooksRetriever = createSelector(retrieveKidsBooks, (kidsBooks) => ({
  kidsBooks,
}));

export default function Children() {
  const history = useHistory();
  const { kidsBooks } = useSelector(kidsBooksRetriever);

  //**Handlers */
  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
    console.log("one:", id);
  };

  return (
    <div className={"popular-children-frame"}>
      <Container>
        <Stack className={"popular-section"}>
          <Box className={"category-title"}>Kids BestSellers</Box>

          <Stack className={"cards-frame"}>
            {kidsBooks.length !== 0 ? (
              kidsBooks.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const priceCals = Math.floor(product.productPrice * 1.3);
                return (
                  <CssVarsProvider key={product._id}>
                    <Card className={"card"}>
                      <CardCover onClick={() => chooseDishHandler(product._id)}>
                        <img src={imagePath} alt="" className={"card-img"} />
                      </CardCover>
                      <CardCover className={"card-cover"} />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                        >
                          <Typography
                            textColor="neutral.300"
                            sx={{ textDecoration: "line-through" }}
                          >
                            ${priceCals}
                          </Typography>
                          <Typography
                            textColor="neutral.300"
                            marginLeft={"60px"}
                          >
                            ${product.productPrice}
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
                          {product.productAuthor}
                        </Typography>
                        <Typography
                          level="h4"
                          font-size="lg"
                          textColor="#fff"
                          mb={1}
                          onClick={() => chooseDishHandler(product._id)}
                        >
                          {product.productName}
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
