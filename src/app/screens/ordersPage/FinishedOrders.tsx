import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selecter";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";

//** REDUX SLICE & SELECTOR **//
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

// FinishedOrders function
export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel sx={{ padding: 0 }} value={"3"}>
      <Stack className="finished-order">
        {finishedOrders?.map((order: Order) => {
          return (
            <Box className="order-main" key={order._id}>
              <Box className="order-box">
                {order?.orderItems?.map((item: OrderItem) => {
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
                          {" "}
                          {item.itemQuantity}
                        </p>
                        <img
                          src="/icons/pause.svg"
                          width={"11px"}
                          height={"10px"}
                          alt=""
                          style={{ marginRight: "2px" }}
                        />
                        <p>$ {item.itemQuantity * item.itemPrice}</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="order-total">
                <Box className="order-total-box">
                  <p style={{ marginRight: "13px" }}>Product price</p>
                  <p style={{ marginRight: "13px" }}>
                    {" "}
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

        {/* IF NOT EXIST */}
        {!FinishedOrders ||
          (FinishedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
