import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveProcessOrders } from "./selecter";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";

const ProcessOrdersRetrieve = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function Proccess(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(ProcessOrdersRetrieve);

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      //Payment process => succseed
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Do you want to finish order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        // process order
        setValue("3");
        // Order rebuild
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel sx={{ padding: 0 }} value={"2"}>
      <Stack className="proccess-order">
        {processOrders.map((order: Order) => {
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
                <Box className="order-btn">
                  <p className="data">{moment().format("YY-MM-DD HH:mm")}</p>
                  <Button
                    className="payment"
                    value={order._id}
                    onClick={finishOrderHandler}
                  >
                    VERIFY TO FULFIL
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
        {!processOrders ||
          (processOrders.length === 0 && (
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
