import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selecter";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";


//** REDUX SLICE & SELECTOR **//
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

// Proccess function
export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  /** HANDLERS **/
  // finishOrderHandler
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you recieved your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
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
        {processOrders?.map((order: Order) => {
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
                <Box className="order-btn">
                  <p className="data">{moment().format("YY-MM-DD HH:mm")}</p>
                  <Button
                    value={order._id}
                    className="payment"
                    onClick={finishOrderHandler}
                  >
                    VERIFY TO FULFIL
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}

        {/* IF NOT EXIST */}
        {!ProcessOrders ||
          (ProcessOrders.length === 0 && (
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
