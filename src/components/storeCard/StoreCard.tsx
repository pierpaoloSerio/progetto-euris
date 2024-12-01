import React from "react";
import "./StoreCard.scss"; 

type Store = {
  id: string;
  data: {
    name?: string;
    category?: string;
    employees?: string[];
  };
};

type StoreCardProps = {
  store: Store;
  onClick: () => void;
};

const ProductCard: React.FC<StoreCardProps> = ({ store, onClick }) => {
  return (
    <div className="store-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="store-element-card">
        <h3>{store.data.name}</h3>
        <p>
          <strong>Categoria:</strong> {store.data.category}
        </p>
        <div className="reviews">
          <h4>Dipendenti:</h4>
          {store.data.employees && store.data.employees.length > 0 ? (
            <ul>
              {store.data.employees.map((employee, index) => (
                <li key={index}>{employee}</li>
              ))}
            </ul>
          ) : (
            <p>Nessun dipendente trovato</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
