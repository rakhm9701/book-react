import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Product, ProductInQuery } from "../../../lib/types/product";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selecter";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

//** REDUX SLICE & SELECTOR **//
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInQuery>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.BIOGRAPHY,
    search: "",
  });
  const [searchText, setSearchtext] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText == "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  //** HANDLERS **//
  const searchCollectionHanndler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
    console.log("one:", id);
  };

  return (
    <div className="products">
      <Container style={{ height: "auto" }}>
        <Stack className="product-frame">
          <Stack className="avatar-big-box">
            <Box className="product-title" sx={{ pr: "132px" }}>
              Burak Restaurant
            </Box>
            <Stack className="product-seach">
              <Box
                width={"255px"}
                height={"11px"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type={"search"}
                  placeholder={"Type here"}
                  className={"search-input"}
                  value={searchText}
                  onChange={(e) => setSearchtext(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                  style={{
                    outline: "none",
                    paddingRight: "120px",
                    paddingLeft: "10px",
                    boxSizing: "border-box",
                    border: "1px solid rgb(255, 255, 255)",
                    borderRadius: "18.5px",
                    boxShadow: "0px 4px 4px 0px rgba(213, 213, 213, 0.25)",
                    background: "rgb(255, 252, 252)",
                  }}
                />
              </Box>
              <Box
                width={"106px"}
                height={"32px"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  sx={{ display: "flex", alignItems: "center" }}
                  variant={"contained"}
                  color={"primary"}
                  onClick={searchProductHandler}
                  style={{
                    width: "106px",
                    height: "32px",
                    borderRadius: "35px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "58px",
                      height: "17px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Search
                  </div>
                  <div
                    style={{
                      width: "13px",
                      height: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SearchIcon />
                  </div>
                </Button>
              </Box>
            </Stack>
          </Stack>
          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => {
                  searchOrderHandler("createdAt");
                }}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchOrderHandler("productPrice");
                }}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchOrderHandler("productViews");
                }}
              >
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className="list-category-section">
            <Stack className="product-category">
              <div className="category-main">
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHanndler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection ===
                    ProductCollection.FANTASY
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHanndler(ProductCollection.FANTASY)
                  }
                >
                  Dessert
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.FICTION
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHanndler(ProductCollection.FICTION)
                  }
                >
                  Drink
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.HISTORY
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHanndler(ProductCollection.HISTORY)
                  }
                >
                  Salad
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.MYSTERY
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHanndler(ProductCollection.MYSTERY)
                  }
                >
                  Dish
                </Button>
              </div>
            </Stack>
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.NON_FICTION
                      ? product.productVolume + "litre"
                      : product.productSize + "size";
                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className="product-img"
                        sx={{
                          backgroundImage: `url(${imagePath})`,
                          backgroundSize: "cover",
                          borderTopRightRadius: "35px",
                        }}
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        <Stack className="shop-hidden">
                          <Button
                            className="shop-btn"
                            onClick={(e) => {
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                              });
                              e.stopPropagation();
                            }}
                            sx={{ left: "110px", bottom: "30px" }}
                          >
                            <img src={"icons/shopping-cart.svg"} />
                          </Button>
                          <Button
                            className="view-btn"
                            sx={{ right: "20px", bottom: "12px" }}
                          >
                            <Badge
                              badgeContent={product.productViews}
                              color="secondary"
                            >
                              <RemoveRedEyeIcon
                                sx={{
                                  color:
                                    product.productViews === 0
                                      ? "gray"
                                      : "white",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-price">
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Popular product are not avaiable!</Box>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="brands-logo">
        <Container>
          <Stack className="brand-frame">
            <Box className="brand-title">Our Family Brands</Box>
            <Stack className="brand-boxs">
              <Box className="brand-box">
                <img src="img/gurme.webp" className="brand-img" alt="" />
              </Box>
              <Box className="brand-box">
                <img src="img/seafood.webp" className="brand-img" alt="" />
              </Box>
              <Box className="brand-box">
                <img src="img/sweets.webp" className="brand-img" alt="" />
              </Box>
              <Box className="brand-box">
                <img src="img/doner.webp" className="brand-img" alt="" />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>
      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5079585.605847458!2d46.79765948485375!3d27.12717371824114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6959a6cf613f%3A0xa197b631f23bhttps://maps.app.goo.gl/ks7QinNTnUdNa9vo61f4a!2sChef%20Burak%20Gurme!5e0!3m2!1sru!2skr!4v1728498436401!5m2!1sru!2skr"
              width={"1320px"}
              height={"500px"}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
