import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { TabContext } from "@mui/lab";
import { Box, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "../../components/divider";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPauseOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInQuiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

//** REDUX SLICE & SELECTOR **//
const actionDispatch = (dispatch: Dispatch) => ({
  setPauseOrders: (data: Order[]) => dispatch(setPauseOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

// OrdersPage function
export default function OrdersPage() {
  const { setPauseOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInQuiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => {
        setPauseOrders(data);
      })
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => {
        setProcessOrders(data);
      })
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => {
        setFinishedOrders(data);
      })
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS **/
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");

  return (
    <div className="order_page">
      <Container className={"order-container"}>
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <PausedOrders setValue={setValue} />
            <ProcessOrders setValue={setValue} />
            <FinishedOrders />
          </TabContext>
        </Stack>
        <Stack className="order-right">
          <Stack className={"order-top"}>
            <div className="images">
              <img
                className="avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember.memberImage} `
                    : ".icons/default-user.svg"
                }
              />
              <img
                className="user"
                src={
                  authMember?.memberType === MemberType.RESTAURANT
                    ? "/icons/restaurant.svg"
                    : "/icons/user-badge.svg"
                }
              />
            </div>
            <p className="fullname"> {authMember?.memberNick}</p>
            <p className="member-type"> {authMember?.memberType}</p>
            <Divider height="2" width="332" bg="rgb(161, 161, 161)" />
            <p className="address">
              <LocationOnIcon />{" "}
              {authMember?.memberAddress
                ? authMember.memberAddress
                : "Do not exist"}
            </p>
          </Stack>
          <Stack className="order-bott">
            <input
              className="card-num"
              type="text"
              placeholder="Card number : 5243 4090 2002 7495"
            />
            <div className="card-box">
              <input className="month" type="text" placeholder="07 / 24" />
              <input className="cvc" type="text" placeholder="CVV : 010" />
            </div>
            <input
              className="name"
              type="text"
              placeholder="Justin Robertson"
            />
            <div className="card-icon-box">
              <img className="card-icon" src="/icons/western-card.svg" alt="" />
              <img className="card-icon" src="/icons/paypal-card.svg" alt="" />
              <img className="card-icon" src="/icons/master-card.svg" alt="" />
              <img className="card-icon" src="/icons/visa-card.svg" alt="" />
            </div>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
