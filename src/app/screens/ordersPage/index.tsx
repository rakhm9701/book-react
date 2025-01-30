import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { TabContext } from "@mui/lab";
import { Box, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../css/order.css";
import Divider from "../../components/divider";
import { setFinishedOrders, setPauseOrders, setProcessOrders } from "./slice";
import { Order, OrderInQuiry } from "../../../lib/types/order";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import Paused from "./PausedOrders";
import Proccess from "./ProcessOrders";
import Finished from "./FinishedOrders";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPauseOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const history = useHistory();
  const { authMember } = useGlobals();
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());

  const { orderBuilder } = useGlobals();

  const [orderInquery, setOrderInquery] = useState<OrderInQuiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquery, orderBuilder]);

  const [value, setValue] = useState("1");

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
            <Paused setValue={setValue} />
            <Proccess setValue={setValue} />
            <Finished />
          </TabContext>
        </Stack>
        <Stack className="order-right">
          <Stack className={"order-top"}>
            <div className="images">
              <img
                className="avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-user.svg"
                }
                alt=""
              />
              <img
                className="user"
                src={
                  authMember?.memberType === MemberType.ADMIN
                    ? "/icons/restaurant.svg"
                    : "/icons/user-badge.svg"
                }
                alt=""
              />
            </div>
            <p className="fullname">{authMember?.memberNick}</p>
            <p className="member-type">{authMember?.memberType}</p>
            <Divider height="2" width="332" bg="rgb(161, 161, 161)" />
            <p className="address">
              <LocationOnIcon style={{ marginRight: "6px" }} />{" "}
              {authMember?.memberAddress
                ? authMember.memberAddress
                : "No Addresss"}
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
