import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStoreDetails } from "../services/api";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchCategoryStats,
  fetchPaginatedProducts,
} from "../features/productsSlice";
import SingleProduct from "../components/singleProductCard/SingleProductCard";
import "./../styles/singleStores.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CategoryChartModal from "../components/categoryChartModal/CategoryChartModal";
import NewProductModal from "../components/newproductModal/NewProductModal";

type Store = {
  name: string;
  category: string;
  employees: string[];
};

const SingleStores: React.FC = () => {
  const { idStore } = useParams<{ idStore: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [store, setStore] = useState<Store | null>(null);
  const [state, setState] = useState({
    loading: true,
    error: null as string | null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalChartOpen, setIsModalChartOpen] = useState(false);
  const [isGridLayout, setIsGridLayout] = useState(true);

  const { products, categories, totalPages, currentPage } = useSelector(
    (state: RootState) => state.products
  );

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStore = async () => {
      if (!idStore) return;

      try {
        const data = await getStoreDetails(idStore);
        setStore(data);
      } catch {
        setState({ loading: false, error: "Failed to load store details" });
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStore();
  }, [idStore]);

  useEffect(() => {
    if (!idStore) return;

    dispatch(
      fetchPaginatedProducts({
        idStore,
        page: currentPage || 1,
        limit: itemsPerPage,
      })
    );
    dispatch(fetchCategoryStats(idStore));
  }, [idStore, currentPage, dispatch]);

  const handlePageChange = (direction: "next" | "prev") => {
    const nextPage = direction === "next" ? currentPage + 1 : currentPage - 1;

    if (nextPage > 0 && nextPage <= totalPages) {
      dispatch(
        fetchPaginatedProducts({
          idStore: idStore!,
          page: nextPage,
          limit: itemsPerPage,
        })
      );
    }
  };

  const handleAddProduct = () => {
    dispatch(
      fetchPaginatedProducts({
        idStore: idStore!,
        page: currentPage || 1,
        limit: itemsPerPage,
      })
    );
  };

  const handleDeleteProduct = async (idProduct: string) => {
    if (!idStore) return;

    try {
      await dispatch(
        deleteProduct({
          idStore,
          idProduct,
        })
      ).unwrap();
      dispatch(
        fetchPaginatedProducts({
          idStore,
          page: currentPage || 1,
          limit: itemsPerPage,
        })
      );
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenChartModal = () => setIsModalChartOpen(!isModalChartOpen);

  const toggleLayout = () => {
    setIsGridLayout((prev) => !prev);
  };

  const isLoading = state.loading || !store;
  const hasError = state.error;

  if (isLoading) return <p>Caricamento...</p>;
  if (hasError) return <p>{hasError}</p>;


  return (
    <div>
      <h1 className="title">Dolci di Piera</h1>
      <p className="subtitle">Pasticceria</p>

      {store?.employees && store.employees.length > 0 ? (
        <div className="employee-list">
          <h3>Dipendenti:</h3>
          <ul>
            {store.employees.map((employee, index) => (
              <li key={index}>{employee}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="no-employees">Nessun dipendente disponibile</p>
      )}

      <div style={{ display: "flex", justifyContent: "space-between",paddingTop: "1rem" }}>
        <button onClick={handleOpenModal} className="button">
          Aggiungi un nuovo prodotto
        </button>
        <button onClick={handleOpenChartModal} className="button">
          Visualizza grafico
        </button>
        <button onClick={toggleLayout} className="button">
          Passa alla visione in {isGridLayout ? "Panels" : "Grid"}
        </button>
      </div>

      {isModalChartOpen && (
        <CategoryChartModal
          isOpen={isModalChartOpen}
          onClose={handleOpenChartModal}
          data={categories}
        />
      )}
      
      <NewProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddProduct}
        idStore={idStore!}
      />

      <div
        className={`product-list ${
          isGridLayout ? "grid-layout" : "panel-layout"
        }`}
      >
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className={`product-item ${
                isGridLayout ? "grid-item" : "panel-item"
              } single-store-product`}
            >
              <SingleProduct product={product} />
              <div className="delete-button">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="delete-button-icon"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nessun prodotto trovato.</p>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="button"
          >
            <i className="fas fa-angle-left"></i>
          </button>
          <span style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
            {currentPage} di {totalPages}
          </span>

          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className="button"
          >
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
        <button onClick={() => navigate("/dashboard")} className="button">
          Torna alla pagina dei negozi
        </button>
      </div>
    </div>
  );
};

export default SingleStores;
