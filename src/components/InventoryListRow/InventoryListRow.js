import React from "react";
import { Link } from "react-router-dom";
import "./InventoryListRow.scss";
import chevron from "../../assets/Icons/chevron_right-24px.svg";

export default function InventoryListRow({ inventories, handleOpenModal }) {
  return (
    <div className="inventorylist__table">
      {inventories.map((inventory) => {
        return (
          <div key={inventory.id} className="inventorylist__box">
            <div className="inventorylist__box-one inventorylist__box-one--inventory">
              <h4 className="inventorylist__box-title">INVENTORY ITEM</h4>
              <Link
                to={`/inventory/${inventory.id}`}
                className="inventorylist__box-value--inventory"
              >
                <h3>{inventory.itemName}</h3>
                <img src={chevron} alt="arrow" />
              </Link>
            </div>
            <div className="inventorylist__box-one inventorylist__box-one--status">
              <h4 className="inventorylist__box-title">STATUS</h4>
              <p
                className={`inventorylist__box-value ${
                  inventory.status === "In Stock"
                    ? "inventorylist__box-value--status"
                    : "inventorylist__box-value--status-oos"
                }`}
              >
                {inventory.status}
              </p>
            </div>
            <div className="inventorylist__box-one inventorylist__box-one--category">
              <h4 className="inventorylist__box-title">CATEGORY</h4>
              <p className="inventorylist__box-value inventorylist__box-value--category">
                {inventory.category}
              </p>
            </div>
            <div className="inventorylist__box-one inventorylist__box-one--quantity">
              <h4 className="inventorylist__box-title">QTY</h4>
              <p className="inventorylist__box-value">{inventory.quantity}</p>
            </div>
            <div className="inventorylist__box-one inventorylist__box-one--empty"></div>
            <div className="inventorylist__box-one inventorylist__box-one--warehouse">
              <h4 className="inventorylist__box-title">WAREHOUSE</h4>
              <p className="inventorylist__box-value">
                {inventory.warehouseName}
              </p>
            </div>
            <div className="inventorylist__box-one inventorylist__buttons">
              <button
                onClick={() => {
                  handleOpenModal(inventory.itemName, inventory.id);
                }}
                className="inventorylist__button--delete"
              ></button>
              <Link to={`/inventory/${inventory.id}/edit`} className="inventorylist__button--edit"></Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
