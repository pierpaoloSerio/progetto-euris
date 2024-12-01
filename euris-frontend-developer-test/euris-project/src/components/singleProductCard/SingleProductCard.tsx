import React from "react";
import "./singleProductCard.scss"; 

type Product = {
  id: string;
  data: {
    title: string;
    category: string;
    price: number;
    employee: string;
    description: string;
    reviews: string[];
  };
};

type SingleProductProps = {
  product: Product;
};

const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  return (
    <div className="single-product">
      <h2>{product.data.title}</h2>
      <p><strong>Categoria:</strong> {product.data.category}</p>
      <p><strong>Prezzo:</strong> ${product.data.price}</p>
      <p><strong>Dipendente:</strong> {product.data.employee}</p>
      <p><strong>Descrizione:</strong> {product.data.description}</p>
      <div>
        <h3>Recensioni:</h3>
        {product.data.reviews.length > 0 ? (
          <ul>
            {product.data.reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
        ) : (
          <p>Nessuna recensione disponibile.</p>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
