import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Skeleton, Switch, Card, Avatar } from "antd";
import { Pagination } from "antd";

import { getProducts, getProductCount, getAds } from "../../Function/Prodt";
import ProductCard from "../cards/ProductCard";

function NewArrivals() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productCount, setProductCount] = useState(0);
  const { Meta } = Card;

  const loadProduct = () => {
    setLoading(true);
    getAds("createdAt", "desc", page)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  console.log(product);
  useEffect(() => {
    loadProduct();
  }, [page]);

  useEffect(() => {
    getProductCount().then((res) => {
      setProductCount(res.data);
    });
  }, []);

  return (
    <>
      <h4>New Arrivals</h4>
      <div className="container">
        {loading ? (
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        ) : (
          <div className="row">
            {product.map((p) => (
              <div key={p._id} className="col-md-4">
                <ProductCard p={p} loading={loading} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-2 p-3">
          <Pagination
            onChange={(value) => setPage(value)}
            defaultCurrent={page}
            total={(productCount / 3) * 10}
          />
        </nav>
      </div>
    </>
  );
}

export default NewArrivals;
