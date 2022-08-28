import React, { useEffect, useState } from "react";
import { getPaginatedProduct } from "../redux/action";
import { Box, Pagination as Pag } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const pageSize = 6;

export default function Pagination() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {        
    setPagination({ ...pagination, count: products.length, from: pagination.from,to:pagination.to });
    console.log(products.length);
    console.log(pagination.from);
    console.log(pagination.to);
  }, [products.length]);

  const handlePageChange = (event, page) => {
    event.preventDefault();
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
    dispatch(getPaginatedProduct({ from: pagination.from, to: pagination.to }));
  };

  return (
    <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
      <Pag
        count={Math.ceil(pagination.count / pageSize)}
        onChange={handlePageChange}
      />
    </Box>
  );
}
