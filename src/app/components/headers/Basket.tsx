import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

// Basket function
export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );

  const shippingCost: number = itemsPrice < 100 ? 5 : 0;

  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  // handleClick
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  // handleClose
  const handleClose = () => {
    setAnchorEl(null);
  };

  // procceedOrderHandler
  const procceedOrderHandler = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.666016 3.32877C0.666016 3.69697 0.964493 3.99545 1.33268 3.99545H3.18988C3.53133 3.99545 3.81758 4.25342 3.85296 4.59302L5.13331 16.8806C5.23947 17.8994 6.09822 18.6733 7.12254 18.6733H19.9589C20.3271 18.6733 20.6256 18.3749 20.6256 18.0067C20.6256 17.6385 20.3271 17.34 19.9589 17.34H7.12254C6.7811 17.34 6.49485 17.082 6.45946 16.7424L6.37547 15.9364L19.2498 14.73C19.6574 14.6918 20.0006 14.4089 20.116 14.0161L22.2896 6.61516C22.4776 5.97476 21.9975 5.33337 21.3301 5.33337H5.27066L5.17912 4.45483C5.07296 3.43603 4.21421 2.66211 3.18988 2.66211H1.33268C0.964493 2.66211 0.666016 2.96059 0.666016 3.32877Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.99935 22.6667C8.73573 22.6667 9.33268 22.0697 9.33268 21.3333C9.33268 20.597 8.73573 20 7.99935 20C7.26297 20 6.66602 20.597 6.66602 21.3333C6.66602 22.0697 7.26297 22.6667 7.99935 22.6667Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.3333 22.6667C18.0697 22.6667 18.6667 22.0697 18.6667 21.3333C18.6667 20.597 18.0697 20 17.3333 20C16.597 20 16 20.597 16 21.3333C16 22.0697 16.597 22.6667 17.3333 22.6667Z"
              fill="black"
            />
          </svg>
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cartItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack flexDirection={"row"}>
                <div>Cart Products:</div>
                <DeleteForeverIcon
                  sx={{ marginLeft: "5px", cursor: "pointer" }}
                  color={"primary"}
                  onClick={() => onDeleteAll()}
                />
              </Stack>
            )}
          </Box>

          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`;
                return (
                  <Box className={"basket-info-box"} key={item._id}>
                    <div className={"cancel-btn"}>
                      <CancelIcon
                        color={"primary"}
                        onClick={() => onDelete(item)}
                      />
                    </div>
                    <img src={imagePath} alt="" className={"product-img"} />
                    <span className={"product-name"}>{item.name}</span>
                    <p className={"product-price"}>
                      ${item.price} x {item.quantity}
                    </p>
                    <Box sx={{ minWidth: 120 }}>
                      <div className="col-2">
                        <button
                          onClick={() => onRemove(item)}
                          className="remove"
                        >
                          -
                        </button>{" "}
                        <button onClick={() => onAdd(item)} className="add">
                          +
                        </button>
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          {cartItems.length !== 0 ? (
            <Box className={"basket-order"}>
              <span className={"price"}>
                Total: ${totalPrice} ({itemsPrice} + {shippingCost})
              </span>
              <Button
                onClick={procceedOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant={"contained"}
              >
                Order
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
