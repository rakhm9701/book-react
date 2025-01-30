import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularBooks from "./BestSellers";
import NewBooks from "./NewBooks";
import Children from "./Children";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setBestSellers,
  setKidsBooks,
  setNewBooks,
  setTopUsers,
} from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import Articles from "./Article";
import "../../../css/home.css";
import { CartItem } from "../../../lib/types/search";
import { Route } from "react-router-dom";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

//** REDUX SLICE & SELECTOR **//
const actionDispatch = (dispatch: Dispatch) => ({
  setBestSellers: (data: Product[]) => dispatch(setBestSellers(data)),
  setKidsBooks: (data: Product[]) => dispatch(setKidsBooks(data)),
  setNewBooks: (data: Product[]) => dispatch(setNewBooks(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage(props: ProductsPageProps) {
  const { onAdd } = props;
  const { setBestSellers, setKidsBooks, setNewBooks, setTopUsers } =
    actionDispatch(useDispatch());

  useEffect(() => {
    // ackend server data fetch => Data.
    const product = new ProductService();

    // productViews  bestSellers
    product
      .getProducts({
        page: 1,
        limit: 9,
        order: "productViews",
        // productCollection: ProductCollection.BIOGRAPHY,
      })
      .then((data) => setBestSellers(data))
      .catch((err) => console.log(err));

    //productViews kidsBooks
    product
      .getProducts({
        page: 1,
        limit: 6,
        order: "productViews",
        productCollection: ProductCollection.CHILDREN,
      })
      .then((data) => setKidsBooks(data))
      .catch((err) => console.log(err));

    // createdAt newBooks
    product
      .getProducts({
        page: 1,
        limit: 6,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => setNewBooks(data))
      .catch((err) => console.log(err));

    const member = new MemberService();

    // getTopUsers Users
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularBooks />
      <Children />
      <NewBooks onAdd={onAdd} />
      <Advertisement />
      <ActiveUsers />
      <Events />
      <Articles />
    </div>
  );
}
