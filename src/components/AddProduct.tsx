import React from "react";

interface AddProductProps {
  onAddProduct: () => void;
  onClick?: () => void;
  className?: string;
}

const AddProduct: React.FC<AddProductProps> = ({
  onAddProduct,
  onClick,
  className,
}) => {
  return (
    <div className="d-flex justify-content-end mb-3">
      <button
        onClick={onAddProduct || onClick}
        className={`btn btn-warning rounded-circle d-flex justify-content-end ${className}`}
        style={{ width: "50px", height: "50px" }}
      >
        <span className="fs-3">+</span>
      </button>
    </div>
  );
};

export default AddProduct;
