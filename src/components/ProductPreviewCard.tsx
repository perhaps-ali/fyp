import React from "react";
import AddProduct from "./AddProduct";

interface Product {
  name: string;
  description: string;
  imageUrl: string;
}

interface ProductPreviewCardProps {
  product: Product;
  onAddProduct: (product: Product) => void;
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addPoduct = () => {
    onAddProduct(product);
  };

  return (
    <div className="w-100 p-4 m-2 rounded text-white bg-gradient text-center">
      {product.imageUrl ? (
        <div className="img-container mx-auto" style={{ maxWidth: "150px" }}>
          <img
            src={product.imageUrl}
            className="img-fluid rounded"
            alt={product.name}
            style={{ objectFit: "cover", height: "150px" }}
          />

          <AddProduct
            onClick={handleAddProduct}
            className="btn btn-warning"
            onAddProduct={function (): void {
              throw new Error("Function not implemented.");
            }}
          ></AddProduct>
        </div>
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default ProductPreviewCard;
