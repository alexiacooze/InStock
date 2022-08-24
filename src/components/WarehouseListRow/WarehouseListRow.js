import React from "react";
import { Link } from "react-router-dom";
import "./WarehouseListRow.scss";
import chevron from "../../assets/Icons/chevron_right-24px.svg";

export default function WarehouseListRow({ warehouses, handleOpenModal }) {
  return (
    <div className="warehouselist__table">
      {warehouses.map((warehouse) => {
        return (
          <div key={warehouse.id} className="warehouselist__box">
            <div className="warehouselist__box-one warehouselist__box-one--name">
              <h4 className="warehouselist__box-title">WAREHOUSE</h4>
              <Link
                to={`/warehouses/${warehouse.id}`}
                className="warehouselist__box-value--location"
              >
                <h3>{warehouse.name}</h3>
                <img src={chevron} alt="arrow" />
              </Link>
            </div>
            <div className="warehouselist__box-one warehouselist__box-one--contact">
              <h4 className="warehouselist__box-title">CONTACT NAME</h4>
              <p className="warehouselist__box-value">
                {warehouse.contact.name}
              </p>
            </div>
            <div className="warehouselist__box-one warehouselist__box-one--address">
              <h4 className="warehouselist__box-title">ADDRESS</h4>
              <p className="warehouselist__box-value warehouselist__box-value--address">
                {warehouse.address}
              </p>
            </div>
            <div className="warehouselist__box-one warehouselist__box-one--contact-info">
              <h4 className="warehouselist__box-title">CONTACT INFORMATION</h4>
              <p className="warehouselist__box-value">
                {warehouse.contact.phone}
              </p>
              <p className="warehouselist__box-value">
                {warehouse.contact.email}
              </p>
            </div>
            <div className="warehouselist__buttons">
              <button
                onClick={() => {
                  handleOpenModal(warehouse.name, warehouse.id);
                }}
                className="warehouselist__button--delete"
              ></button>
              <Link
                to={`/warehouses/${warehouse.id}/edit`}
                className="warehouselist__button--edit"
              ></Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
