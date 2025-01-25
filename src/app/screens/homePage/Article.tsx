import { Box, Card, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";
import { CardOverflow, CssVarsProvider } from "@mui/joy";
import Divider from "../../components/divider";
import { NavLink } from "react-router-dom";

const list = [
  {
    productName: "Automic Habbit",
    ProductType: "Experience",
    imagePath: "/img/istockphoto-174792161-612x612.jpg",
  },
  {
    productName: "Deep Work",
    ProductType: "Other",
    imagePath: "/img/istockphoto-1162698015-612x612.jpg",
  },
];

export default function Articles() {
  return (
    <div className={"articles-frame"}>
      <Stack className={"events-main"}>
        <Box className={"events-text"}>
          <span className={"category-title"}>Articles</span>
        </Box>
        <Stack className={"cards-frame"}>
          <CssVarsProvider>
            {list.length !== 0 ? (
              list.map((ele, index) => {
                return (
                  <Card key={index} variant="outlined" className={"card"}>
                    <CardOverflow className={"card-over"}>
                      <Box className={"content"}>
                        <strong>Title: {ele.ProductType}</strong>
                        <Divider height="2" width="4" bg="#A09D9D" />
                        <p>
                          the main body of printed or written matter on a page b
                          : the principal part of a book exclusive of front and
                          back matter c : the printed score of a musical
                          composition
                        </p>
                      </Box>
                    </CardOverflow>
                    <Box className={"img-box"}>
                      <img src={ele.imagePath} alt="" className={"img"} />
                    </Box>
                  </Card>
                );
              })
            ) : (
              <Box className="no-data"> New product are not available! </Box>
            )}
          </CssVarsProvider>
          <Box className={"read"}>
            <NavLink to=""> Read More</NavLink>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
