import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./WarehouseDetailsRow.scss";
import chevron from "../../assets/Icons/chevron_right-24px.svg";

export default class WarehouseDetailsRow extends Component {
  render() {
    return (
      <div className="warehousedetails__table">
        {this.props.currentInventory.map((warehouse) => {
          return (
            <div key={warehouse.id} className="warehousedetails__box">
              <div className="warehousedetails__box-one warehousedetails__box-one--inventory">
                <h4 className="warehousedetails__box-title">INVENTORY</h4>
                <Link to={`/inventory/${warehouse.id}`} className="warehousedetails__box-value--inventory">
                  <h3>{warehouse.itemName}</h3>
                  <img src={chevron} alt="arrow" />
                </Link>
              </div>
              <div className="warehousedetails__box-one warehousedetails__box-one--status">
                <h4 className="warehousedetails__box-title">STATUS</h4>
                <p
                  className={`warehousedetails__box-value ${warehouse.status === "In Stock"
                      ? "warehousedetails__box-value--status"
                      : "warehousedetails__box-value--status-oos"
                    }`}
                >
                  {warehouse.status}
                </p>
              </div>
              <div className="warehousedetails__box-one warehousedetails__box-one--category">
                <h4 className="warehousedetails__box-title">CATEGORY</h4>
                <p className="warehousedetails__box-value warehousedetails__box-value--category">
                  {warehouse.category}
                </p>
              </div>
              <div className="warehousedetails__box-one warehousedetails__box-one--quantity">
                <h4 className="warehousedetails__box-title">QTY</h4>
                <p className="warehousedetails__box-value">
                  {warehouse.quantity}
                </p>
              </div>
              <div className="warehousedetails__buttons">
                <button className="warehousedetails__button--delete" onClick={() => { this.props.handleOpenModal(warehouse.itemName, warehouse.id) }}></button>
                <Link to={`/inventory/${warehouse.id}/edit`} className="warehousedetails__button--edit"></Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
