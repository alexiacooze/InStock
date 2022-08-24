import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './WarehouseDetails.scss'
import { WAREHOUSES_API } from '../../utils/appConfig';
import WarehouseDetailsRow from '../WarehouseDetailsRow/WarehouseDetailsRow';
import edit from '../../assets/Icons/edit-24px.svg'
import back from '../../assets/Icons/arrow_back-24px.svg'
import sort from '../../assets/Icons/sort-24px.svg'
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import X from "../../assets/Icons/close-24px.svg";

Modal.setAppElement("#root");

class WarehouseDetails extends Component {
    state = {
        currentWarehouse: {},
        currentInventory: [],
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
        WAREHOUSES_API.getOne('warehouses', this.props.match.params.warehouseId)
            .then(res => {
                this.setState({
                    currentWarehouse: res.data[0].warehouse,
                    currentInventory: res.data[0].inventory
                })
            })
    }

    render() {
        if (this.state.currentWarehouse.contact) {
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


                    <div className='warehousedetails__container'>
                        <div className='warehousedetails'>
                            <div className='warehousedetails__header'>
                                <div className='warehousedetails__header--return'>
                                    <Link to={'/warehouses'}><img src={back} alt='back' /></Link>
                                    <h1 className='warehousedetails__header--title'>{this.state.currentWarehouse.name}</h1>
                                </div>
                                <div className='warehousedetails__header--edit-container'>
                                    <Link to={`/warehouses/${this.state.currentWarehouse.id}/edit`}><img src={edit} alt='edit' className='warehousedetails__header--edit' /></Link>
                                    <h3 className='warehousedetails__header--edit-text'>Edit</h3>
                                </div>
                            </div>
                            <div className='warehousedetails__info'>
                                <div className='warehousedetails__address'>
                                    <h4>WAREHOUSE ADDRESS:</h4>
                                    <p>{`${this.state.currentWarehouse.address}, ${this.state.currentWarehouse.city}, ${this.state.currentWarehouse.country}`}</p>
                                </div>
                                <div className='warehousedetails__contact'>
                                    <div className='warehousedetails__contact--box warehousedetails__contact--box--name'>
                                        <h4 className=''>CONTACT NAME:</h4>
                                        <p>{this.state.currentWarehouse.contact.name}</p>
                                        <p>{this.state.currentWarehouse.contact.position}</p>
                                    </div>
                                    <div className='warehousedetails__contact--box warehousedetails__contact--box--info'>
                                        <h4>CONTACT INFORMATION:</h4>
                                        <p>{this.state.currentWarehouse.contact.phone}</p>
                                        <p>{this.state.currentWarehouse.contact.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='warehousedetails__title--display'>
                                <h4>INVENTORY ITEM<img src={sort} alt='arrows' /></h4>
                                <h4>CATEGORY <img src={sort} alt='arrows' /></h4>
                                <h4>STATUS <img src={sort} alt='arrows' /></h4>
                                <h4>QUANTITY <img src={sort} alt='arrows' /></h4>
                                <h4>ACTIONS</h4>
                            </div>
                            <WarehouseDetailsRow currentInventory={this.state.currentInventory} handleOpenModal={this.handleOpenModal} />
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default WarehouseDetails;
