import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./InventoryList.scss";
import { WAREHOUSES_API } from "../../utils/appConfig";
import sort from "../../assets/Icons/sort-24px.svg";
import InventoryListRow from "../InventoryListRow/InventoryListRow";
import Modal from "react-modal";
import X from "../../assets/Icons/close-24px.svg";

Modal.setAppElement("#root");

class InventoryList extends Component {
  state = {
    inventory: [],
    showModal: false,
    clickedName: "",
    clickedId: "",
    isDeleted: false,
  };

  handleOpenModal = (name, id) => {
    this.setState({
      showModal: true,
      clickedName: name,
      clickedId: id,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleDelete = () => {
    WAREHOUSES_API.deleteOne("inventories", this.state.clickedId).then(
      (res) => {
        this.setState({
          showModal: false,
          isDeleted: true,
          inventory: this.state.inventory.filter((inventory) => {
            return inventory.id !== this.state.clickedId;
          }),
        });
      }
    );
  };

  componentDidMount() {
    WAREHOUSES_API.getAll("inventories")
      .then((res) => {
        this.setState({
          inventory: res.data,
        })
      })
      .catch((error) => {
        console.log("Mount", error);
      });
  }

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.showModal}
          onRequestCose={this.handleCloseModal}
          overlayClassName="overlay"
          className="modal"
        >
          <div className="modal__content">
            <img onClick={this.handleCloseModal} className="modal__close" src={X} alt="Close Window" />
            <h1 className="modal__header">
              Delete {this.state.clickedName} inventory item?
            </h1>
            <p className="modal__message large">
              Please confirm that you'd like to delete {this.state.clickedName}{" "}
              from the inventory list. You won't be able to undo this action.
            </p>
          </div>
          <div className="modal__buttons">
            <button className="modal__button" onClick={this.handleCloseModal}>
              <h3>Cancel</h3>
            </button>
            <button
              onClick={this.handleDelete}
              className="modal__button modal__button--delete"
            >
              <h3>Delete</h3>
            </button>
          </div>
        </Modal>

        <div className="inventorylist__container">
          <div className="inventorylist">
            <div className="inventorylist__header">
              <h1 className="inventorylist__title">Inventory</h1>
              <form className="inventorylist__form">
                <input
                  className="inventorylist__form-search"
                  type="search"
                  name="searchBar"
                  placeholder="Search..."
                />
                <NavLink
                  to="/inventory/add"
                  className="inventorylist__button--add"
                >
                  <h3> + Add New Item</h3>
                </NavLink>
              </form>
            </div>
            <div className="inventorylist__title--display">
              <h4>
                INVENTORY ITEM
                <img src={sort} alt="arrows" />
              </h4>
              <h4>
                CATEGORY <img src={sort} alt="arrows" />
              </h4>
              <h4>
                STATUS <img src={sort} alt="arrows" />
              </h4>
              <h4>
                QTY <img src={sort} alt="arrows" />
              </h4>
              <h4>
                WAREHOUSE <img src={sort} alt="arrows" />
              </h4>
              <h4>ACTIONS</h4>
            </div>
            <InventoryListRow
              inventories={this.state.inventory}
              handleOpenModal={this.handleOpenModal}
            />
          </div>
        </div>
      </>
    );
  }
}

export default InventoryList;
