import React from "react";
import { useQuery } from "react-query";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { fetchOrders } from "../../../api/apiRequests";

function Orders() {
  const { isLoading, isError, error, data } = useQuery(
    "admin:orders",
    fetchOrders
  );
  const orders = [
    {
      user: "mehmet@seven.com",
      address: "Ataşehir/İstanbul",
      product: "Acer Notebook",
      quantity: 1,
    },
    {
      user: "admin@admin.com",
      address: "Üsküdar/İstanbul",
      product: "Lenovo Notebook",
      quantity: 1,
    },
    {
      user: "ahmet@ahmet.com",
      address: "Beşiktaş/İstanbul",
      product: "Hp Printer",
      quantity: 2,
    },
    {
      user: "kemal@gmail.com",
      address: "Avcılar/İstanbul",
      product: "Toshiba HDD",
      quantity: 3,
    },
  ];
  if (isLoading ? false : false) {
    return <div>Loading...</div>;
  }
  if (isError ? false : false) {
    return <div>Error{error.message}</div>;
  }
  return (
    <div>
      <TableContainer>
        <Table variant="striped">
        
          <Thead>
          <TableCaption>Orders</TableCaption>
            <Tr>
              <Th>User</Th>
              <Th>Address</Th>
              <Th>Items</Th>
              <Th isNumeric>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={Math.random() * 100}>
                <Td>{order.user}</Td>
                <Td>{order.address}</Td>
                <Td>{order.product}</Td>
                <Td isNumeric>{order.quantity}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>email</Th>
              <Th>address</Th>
              <Th>product</Th>
              <Th isNumeric>Quantity</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Orders;
