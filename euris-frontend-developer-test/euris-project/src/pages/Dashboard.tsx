

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import ProductCard from "../components/storeCard/StoreCard";
import "./../styles/dashboard.scss";
import { useNavigate } from "react-router-dom";
import { fetchStoreList } from "../features/productsSlice";


const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { stores, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchStoreList());
  }, [dispatch]);

  const handleStoreClick = (idStore: string) => {
    navigate(`/stores/${idStore}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="dashboard-title">Negozi trovati:</h1>
      <div className="product-grid">
        {stores.map((store) => (
          <ProductCard
            key={store.id}
            store={store}
            onClick={() => handleStoreClick(store.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
