import React, { useMemo } from "react";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Link, Outlet } from "react-router-dom";
import { Space, Table, Popconfirm } from "antd";

import { fetchProducts, deleteProduct } from "../../../api/apiRequests";
import "./styles.css";
import { Flex, Button } from "@chakra-ui/react";

function AllProducts() {
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data } = useQuery(
    "admin:products",
    fetchProducts
  );
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });
  const columns = useMemo(() => {
    return [
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        render: (text) => <span>{text.name}</span>,
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (text) => <Link to="/">{text}</Link>,
      },
      {
        title: "Created Date",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => (
          <span>{moment(text).format(" DD MMMM YYYY, hh:mm:ss")}</span>
        ),
      },
      {
        title: "Created By",
        key: "createdBy",
        dataIndex: "createdBy",
        render: (text) => <span>{text.name}</span>,
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/admin/products/${record.slug}`}>Edit</Link>
            <Popconfirm
              title="You are deleting this record! are you sure?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log("deleting success");
                  },
                });
                queryClient.invalidateQueries();
              }}
              onCancel={() => alert("Product Delete canceled!")}
              okText="Delete"
              cancelText="Cancel"
              placement="left"
            >
              <Link to="/">Delete</Link>
            </Popconfirm>
          </Space>
        ),
      },
    ];
  }, []);

  console.log("Admin-Products", data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error{error.message}</div>;
  }

  return (
    <div>
      <Flex justifyContent="flex-end">
        <Link to="/admin/products/new">
          <Button colorScheme="blue" m="2">
            New Product
          </Button>
        </Link>
      </Flex>
      <Table
        columns={columns}
        dataSource={data.data}
        rowKey="_id"
        className="table-bg"
      />
      <Outlet />
    </div>
  );
}

export default AllProducts;
