import React from "react";
import "./CategoryChartModal.scss";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

type CategoryChartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: { numberOfProducts: number; category: string }[];
};

const CategoryChartModal: React.FC<CategoryChartModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Number of Products",
        data: data.map((item) => item.numberOfProducts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-header">Category Statistics</h2>
        <div className="chart-container">
          <PolarArea data={chartData} />
        </div>
        <div className="modal-actions">
          <button className="button cancel" onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryChartModal;
