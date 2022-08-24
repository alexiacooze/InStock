import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./WarehouseList.scss";
import { WAREHOUSES_API } from "../../utils/appConfig";
import WarehouseListRow from "../WarehouseListRow/WarehouseListRow";
import Modal from "react-modal";
import X from "../../assets/Icons/close-24px.svg";

Modal.setAppElement("#root");

class WarehouseList extends Component {
  state = {
    warehouses: [],
    showModal: false,
    clickedName: "",
    clickedId: "",
    isDeleted: false,
  };

  handleOpenModal = (name, id) => {
    this.setState({
      showModal: true,
      clickedName: name,
      clickedId: id
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleDelete = () => {
    WAREHOUSES_API.deleteOne("warehouses", this.state.clickedId).then(res => {
      this.setState({
        showModal: false,
        isDeleted: true,
        warehouses: this.state.warehouses.filter(warehouse => {
          return warehouse.id !== this.state.clickedId
        })
      });
    })
  };

  componentDidMount() {
    WAREHOUSES_API.getAll("warehouses")
      .then((res) => {
        this.setState({
          warehouses: res.data
        });
      })
      .catch(error => {
        console.log('Mount', error)
      })
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
              Delete {this.state.clickedName} warehouse?
            </h1>
            <p className="modal__message large">
              Please confirm that you'd like to delete {this.state.clickedName}{" "}
              from the list of warehouses. You won't be able to undo this
              action.
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

        <div className="warehouselist__container">
          <div className="warehouselist">
            <div className="warehouselist__header">
              <h1 className="warehouselist__title">Warehouses</h1>
              <form className="warehouselist__form">
                <input
                  className="warehouselist__form-search"
                  type="search"
                  name="searchBar"
                  placeholder="Search..."
                />
                <Link
                  to="/warehouses/add"
                  className="warehouselist__button--add"
                >
                  <h3>+ Add New Warehouse</h3>
                </Link>
              </form>
            </div>
            <div className="warehouselist__title--display">
              <h4>WAREHOUSES</h4>
              <h4>ADDRESS</h4>
              <h4>CONTACT NAME</h4>
              <h4>CONTACT INFORMATION</h4>
              <h4>ACTIONS</h4>
            </div>
            <WarehouseListRow
              warehouses={this.state.warehouses}
              handleOpenModal={this.handleOpenModal}
            />
          </div>
        </div>
      </>
    );
  }
}

export default WarehouseList;
