import React, { Component } from "react";
import "../InventoryItemDetails/InventoryItemDetails.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import Edit from "../../assets/Icons/edit-24px.svg";
import { Link, NavLink } from "react-router-dom";
import { WAREHOUSES_API } from "../../utils/appConfig";

export default class InventoryItemDetails extends Component {
  state = {
    inventoryDetails: [],
  };

  componentDidMount() {
    console.log(this.props.match.params.inventoryId);
    WAREHOUSES_API.getOne(
      "inventories",
      this.props.match.params.inventoryId
    ).then((res) => {
      this.setState({
        inventoryDetails: res.data,
      });
      console.log(res);
    });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { inventoryDetails: inventory } = this.state;
    return (
      <section key={inventory.id} className="inventory">
        <div className="inventory__container">
          <div className="inventory__header-container">
            <div className="inventory__title-container">
              <img
                alt="Back Arrow"
                className="inventory__back-arrow"
                src={backArrow}
                onClick={this.goBack}
              />
              <h1 className="inventory__title" alt="">
                {inventory.itemName}
              </h1>
            </div>
            <NavLink
              to={`/inventory/${this.props.match.params.inventoryId}/edit`}
              className=""
            >
              <div className="warehousedetails__header--edit-container">
                <Link to={`/inventory/${inventory.id}/edit`}>
                  <img
                    src={Edit}
                    alt="edit"
                    className="warehousedetails__header--edit"
                  />
                </Link>
                <h3 className="warehousedetails__header--edit-text">Edit</h3>
              </div>
            </NavLink>
          </div>

          <div className="inventory-info">
            <div className="inventory-info__section--one">
              <p className="inventory-info__description-title">
                item description:
              </p>
              <p className="inventory-info__description">
                {inventory.description}
              </p>

              <p className="inventory-info__category-title">category:</p>
              <p className="inventory-info__category">{inventory.category}</p>
            </div>

            <div className="inventory-info__section--2">
              <div className="inventory-info__position-container">
                <div className="inventory__status-container">
                  <p className="inventory-info__status-title">status:</p>
                  <p
                    className={`inventory-info__status ${
                      inventory.status === "In Stock"
                        ? "inventorylist__box-value--status"
                        : "inventorylist__box-value--status-oos"
                    }`}
                  >
                    {inventory.status}
                  </p>
                </div>
                <div className="inventory__quantity-container">
                  <p className="inventory-info__quantity-title">quantity:</p>
                  <p className="inventory-info__quantity">
                    {inventory.quantity}
                  </p>
                </div>
              </div>
              <p className="inventory-info__warehouse-title">warehouse:</p>
              <p className="inventory-info__warehouse">
                {inventory.warehouseName}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
