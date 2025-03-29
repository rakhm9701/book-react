import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";
import Divider from "../../components/divider";
import { ProductType } from "../../../lib/enums/product.enum";

const list = [
  {
    productName: "Automic Habbit",
    ProductType: "Humur",
    imagePath: "/img/events1.avif",
    
  },
  {
    productName: "Self Improve",
    ProductType: "Other",
    imagePath: "/img/events2.avif",
  },
  {
    productName: "Self Improve",
    ProductType: "Humur",
    imagePath: "/img/events3.webp",
  },
  {
    productName: "Biography",
    ProductType: "Other",
    imagePath: "/img/events4.jpg",
  },
  {
    productName: "Self Improve",
    ProductType: "Recommend",
    imagePath: "/img/events3.webp",
  },
  {
    productName: "Biography",
    ProductType: "Humur",
    imagePath: "/img/events4.jpg",
  },
];

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"}>
        <Box className={"events-text"}>
          <span className={"category-title"}>Events</span>
        </Box>

        <Swiper
          className={"events-info swiper-wrapper"}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
        >
          {list.length !== 0 ? (
            list.map((ele, index) => {
              return (
                <SwiperSlide key={index} className={"events-info-frame"}>
                  <Box className={"events-desc"}>
                    <div>
                      <img src={ele.imagePath} alt="" className={"img"} />
                    </div>
                  </Box>

                  <Box className={"events-desc"}>
                    <Box className={"events-bott"}>
                      <Box className={"bott-left"}>
                        <div className={"event-title-speaker"}>
                          <strong>Title:    {ele.ProductType}</strong>
                          <strong>Name:   {ele.productName}</strong>
                          <Divider height="2" width="4" bg="#A09D9D" />
                          <h5> T: here there is some text about the event</h5>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })
          ) : (
            <Box className="no-data"> New product are not available! </Box>
          )}
        </Swiper>
        <Box className={"prev-next-frame"}>
          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-prev"}
          />
          <div className={"dot-frame-pagination swiper-pagination"}></div>
          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-next"}
            style={{ transform: "rotate(-180deg)" }}
          />
        </Box>
      </Stack>
    </div>
  );
}
