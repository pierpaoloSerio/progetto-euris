import React, { useState } from "react";
import "./NewProductModal.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addProduct } from "../../features/productsSlice";

type Product = {
  title?: string;
  category?: string;
  price?: number;
  employee?: string;
  description?: string;
  reviews?: string[];
};

type NewProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  idStore: string;
};

const NewProductModal: React.FC<NewProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  idStore,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product>({
    title: "",
    category: "",
    price: 0,
    employee: "",
    description: "",
    reviews: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "reviews") {
      const reviewsArray = value.split("\n");
      setProduct((prev) => ({
        ...prev,
        reviews: reviewsArray,
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (isNaN(product.price!) || product.price! <= 0) {
      alert("Price must be a positive number.");
      return;
    }

    await dispatch(addProduct({ idStore, product }));
    onClose();
    onSubmit();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-header">Aggiungi un nuovo prodotto</h2>
        <form className="modal-body">
          <label>
            Titolo:
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Categoria:
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Prezzo:
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Dipendente:
            <input
              type="text"
              name="employee"
              value={product.employee}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Descrizione:
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            Recensioni:
            <textarea
              name="reviews"
              value={product.reviews?.join("\n") || ""}
              onChange={handleInputChange}
            />
          </label>
        </form>
        <div className="modal-actions">
          <button className="button cancel" onClick={onClose}>
            Chiudi
          </button>
          <button className="button submit" onClick={handleSubmit}>
            Aggiungi prodotto
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProductModal;
