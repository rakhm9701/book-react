import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveFinishedOrders } from "./selecter";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const FinishedOrdersRetrieve = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function Finished() {
  const { finishedOrders } = useSelector(FinishedOrdersRetrieve);

  return (
    <TabPanel sx={{ padding: 0 }} value={"3"}>
      <Stack className="finished-order">
        {finishedOrders.map((order: Order) => {
          return (
            <Box className="order-main" key={order._id}>
              <Box className="order-box">
                {order.orderItems.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <Box className="order-one" key={item._id}>
                      <Box className="order-name">
                        <img src={imagePath} className="order-img" alt="" />
                        <p className="order-text">{product.productName}</p>
                      </Box>
                      <Box className="order-price">
                        <p style={{ marginRight: "2px" }}>${item.itemPrice}</p>
                        <img
                          src="/icons/close.svg"
                          width={"11px"}
                          height={"10px"}
                          alt=""
                          style={{ marginRight: "2px" }}
                        />
                        <p style={{ marginRight: "2px" }}>
                          {item.itemQuantity}
                        </p>
                        <img
                          src="/icons/pause.svg"
                          width={"11px"}
                          height={"10px"}
                          alt=""
                          style={{ marginRight: "2px" }}
                        />
                        <p>${item.itemQuantity * item.itemPrice}</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="order-total">
                <Box className="order-total-box">
                  <p style={{ marginRight: "13px" }}>Product price</p>
                  <p style={{ marginRight: "13px" }}>
                    ${order.orderTotal - order.orderDelivery}
                  </p>
                  <img
                    src="/icons/plus.svg"
                    width={"11px"}
                    height={"10px"}
                    alt=""
                    style={{ marginRight: "13px" }}
                  />
                  <p style={{ marginRight: "13px" }}>Delivery cost</p>
                  <p style={{ marginRight: "13px" }}>${order.orderDelivery}</p>
                  <img
                    src="/icons/pause.svg"
                    width={"11px"}
                    height={"10px"}
                    alt=""
                    style={{ marginRight: "13px" }}
                  />
                  <p style={{ marginRight: "13px" }}>Total</p>
                  <p>${order.orderTotal}</p>{" "}
                </Box>
              </Box>
            </Box>
          );
        })}
        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <img
                src="/icons/noimage-list.svg"
                alt=""
                style={{ width: "300px", height: "300px" }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
