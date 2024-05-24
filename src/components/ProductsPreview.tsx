import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AddProduct from "./AddProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/cart/cartSlice.mjs";
import React from "react";

interface Product {
  name: string;
  description: string;
  imageUrl: string;
}

interface ProductPreviewCardProps {
  product: Product;
  onAddProduct?: (product: Product) => void;
}

const ProductPreviewCard = ({
  product,
  onAddProduct,
}: ProductPreviewCardProps) => {
  const handleAddProduct = () => {
    if (onAddProduct) {
      onAddProduct(product);
    }
  };

  return (
    <div className="w-100 p-4 m-2 rounded text-white bg-black text-center">
      {product.imageUrl ? (
        <div className="img-container mx-auto" style={{ maxWidth: "80%" }}>
          <img
            src={product.imageUrl}
            className="img-fluid rounded"
            alt={product.name}
            style={{ objectFit: "cover", height: "150px" }}
          />
          {onAddProduct && (
            <AddProduct
              onClick={handleAddProduct}
              className="btn btn-danger"
              onAddProduct={handleAddProduct}
            />
          )}
        </div>
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

const ProductsPreview = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5.5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3.5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2.5 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1.5 },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data.data || []);
        } else {
          throw new Error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const onAddProduct = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container my-5 bg-black">
      <h2 className="text-center text-danger mb-3">Products</h2>
      <div className="row ">
        <Carousel responsive={responsive}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="row-md-2 mb-3">
                <div
                  className="card h-150 bg-warning"
                  style={{ height: "450px" }}
                >
                  <div className="card-body bg-black text-black">
                    <h5 className="card-title text-primary">{product.name}</h5>
                    <p className="card-text text-white">
                      {product.description}
                    </p>
                    <div>
                      <ProductPreviewCard
                        key={index}
                        product={product}
                        onAddProduct={onAddProduct}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col text-center">
              <p>No products found.</p>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductsPreview;
