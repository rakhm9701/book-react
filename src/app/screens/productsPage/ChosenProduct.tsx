import React, { useEffect, useState } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setChosenProduct, setShop } from "./slice";
import { Product } from "../../../lib/types/product";
import { useDispatch, useSelector } from "react-redux";
import { retrieveChosenProduct, retrieveShop } from "./selecter";
import { Dispatch } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setShop: (data: Member) => dispatch(setShop(data)),
});

const ChosenProductRetrieve = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);

const ShopRetrieve = createSelector(retrieveShop, (shop) => ({
  shop,
}));

interface ChosenProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductsProps) {
  const [likeTarget, setLikeTarget] = useState<boolean>(false)
  const { onAdd } = props;
  const { setChosenProduct } = actionDispatch(useDispatch());
  const { setShop } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(ChosenProductRetrieve);
  console.log("chosenProduct:", chosenProduct);
  const { shop } = useSelector(ShopRetrieve);
  console.log("shop:", shop);

  /* Hook */
  const { productId } = useParams<{ productId: string }>();
  console.log("id", productId);

  useEffect(() => {
    const product = new ProductService();

    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log("Err chosenProduct:", err));

    const member = new MemberService();
    member
      .getRastaurant()
      .then((data) => setShop(data))
      .catch((err) => console.log(err));
  }, [likeTarget]);

  //**Handlers */

  const likeHandlers = async (productId: string) => {
    try {
      const product = new ProductService();
      const result = await product.getlikes(productId);
      setLikeTarget(likeTarget => !likeTarget)
    } catch (err) {}
  };

  if (!chosenProduct) return null;
  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img className="slider-image" src={imagePath} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>
              {chosenProduct?.productName}
            </strong>
            <span className={"resto-name"}>{shop?.memberNick}</span>
            <span className={"resto-name"}>{shop?.memberPhone}</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <Button
                  style={{ marginRight: "15px" }}
                  onClick={() => likeHandlers(chosenProduct?._id)}
                >
                  <FavoriteIcon
                    sx={{
                      color: chosenProduct.like ? "red" : "black",
                      mr: "10px",
                      fontSize: 20,
                      alignItems: "center",
                    }}
                  />
                  {chosenProduct.productLikes}
                </Button>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>
              {chosenProduct.productDesc
                ? chosenProduct.productDesc
                : "No desc"}
            </p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>${chosenProduct.productPrice}</span>
            </div>
            <div className={"button-box"}>
              <Button
                variant="contained"
                onClick={(e) => {
                  console.log("Button Press");
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>

        <Stack className={"other-info"}>
          <Box className={"extra-info"}>
            <span className={"info"}>Author:{chosenProduct.productAuthor}</span>
          </Box>

          <Box className={"extra-info"}>
            <span className={"info"}>
              Category:{chosenProduct.productCollection}
            </span>
          </Box>

          <Box className={"extra-info"}>
            <span className={"info"}> Size: {chosenProduct.productSize}</span>
          </Box>

          <Box className={"extra-info"}>
            <span className={"info"}>
              Description:{chosenProduct.productDesc}
            </span>
          </Box>

          <Box className={"extra-info"}>
            <span className={"info"}> 14-day Returns</span>
          </Box>

          <Box></Box>
        </Stack>
      </Container>
    </div>
  );
}
