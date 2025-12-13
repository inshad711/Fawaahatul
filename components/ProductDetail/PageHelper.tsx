"use client";
import { setProductData } from "@/store/slice/productDataSlice";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  data: any;
}

const PageHelper: React.FC<Props> = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setProductData(data));
    }
  }, [data]);

  return null;
};

export default PageHelper;
