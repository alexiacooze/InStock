import { Component } from "react";
import { WAREHOUSES_API } from "../../utils/appConfig";
import "./AddInventoryItem.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

class InventoryAdd extends Component {
    state = {
        id: "",
        warehouseID: "",
        itemName: "",
        description: "",
        category: "Electronics",
        status: "In stock",
        warehouseName: "",
        warehousesPairs: []
    };

    filtered = new Set();

    filteredArr = []

    componentDidMount() {

        WAREHOUSES_API.getAll(
            'warehouses'
        ).then(res => {
            console.log(res.data, "Warehouses Get All")
            const locations = res.data.map(item => {
                return { name: item.name, id: item.id }
            })
            this.setState({
                warehousesPairs: locations,
                warehouseName: locations[0].name,
                warehouseID: locations[0].id
            })
        })
    }

    formHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    editInventorySubmitHandler = (e) => {
        e.preventDefault();

        WAREHOUSES_API.postOne("inventories", {
            id: this.state.id,
            warehouseID: this.state.warehousesPairs.find(item => item.name === this.state.warehouseName).id,
            warehouseName: this.state.warehouseName,
            itemName: this.state.itemName,
            description: this.state.description,
            category: this.state.category,
            status: this.state.status
        });
    };

    render() {
        return (
            //do border top on both form sections
            <section className="inventory-add">
                <div className="inventory-add__top-container">
                    <Link to={'/inventory'}><img
                        alt="Back Arrow"
                        className="inventory-add__back-arrow"
                        src={backArrow}
                    /> </Link>
                    <h1 className="inventory-add__heading"> Add New Inventory Item</h1>
                </div>
                <form
                    className="inventory-add__form inventory-form"
                    onSubmit={this.editInventorySubmitHandler}
                >
                    <section className="inventory-form-section__section inventory-form-section__section--details">
                        <h2 className="inventory-form-section__heading">Item Details</h2>
                        <div className="inventory-form-section__input-container">
                            <label htmlFor="itemName" className="inventory-form-section__label">
                                Item Name
                            </label>
                            <input
                                type="text"
                                id="itemName"
                                name="itemName"
                                className="inventory-form-section__input"
                                onChange={this.formHandler}
                            />
                        </div>
                        <div className="inventory-form-section__input-container">
                            <label htmlFor="description" className="inventory-form-section__label">
                                Description
                            </label>
                            <textarea
                                type="text"
                                id="description"
                                name="description"
                                className="inventory-form-section__input inventory-form-section__input--textarea"
                                onChange={this.formHandler}
                            />
                        </div>
                        <div className="inventory-form-section__input-container">
                            <label htmlFor="category" className="inventory-form-section__label inventory-form-section__label--category">
                                Category
                            </label>
                            <select
                                type="text"
                                id="category"
                                name="category"
                                className="inventory-form-section__input inventory-form-section__input--category"
                                onChange={this.formHandler}
                                defaultValue='Electronics'
                            >
                                <option>Electronics</option>
                                <option>Gear</option>
                                <option>Apparel</option>
                                <option>Accessories</option>
                                <option>Health</option>

                            </select>
                        </div>
                    </section>
                    <section className="inventory-form-section__section inventory-form-section__section--availability">
                        <h2 className="inventory-form-section__heading">Item Availability</h2>
                        <div className="inventory-form-section__input-container inventory-form-section__input-container--size">
                            <label htmlFor="status" className="inventory-form-section__label">
                                Status
                            </label>
                            <div className="inventory-form-section__radios">
                                <div className="inventory-form-section__radio">
                                    <input
                                        type="radio"
                                        id="status"
                                        name="status"
                                        value='In stock'
                                        className="inventory-form-section__input inventory-form-section__input--status"
                                        onChange={this.formHandler}
                                    />
                                    <label htmlFor="inStock" className="inventory-form-section__label inventory-form-section__label--status">
                                        In stock
                                    </label>
                                </div>
                                <div className="inventory-form-section__radio">
                                    <input
                                        type="radio"
                                        id="status"
                                        name="status"
                                        value='Out of Stock'
                                        className="inventory-form-section__input inventory-form-section__input--status"
                                        onChange={this.formHandler}
                                    />
                                    <label htmlFor="OutOfStock" className="inventory-form-section__label inventory-form-section__label--status">
                                        Out of stock
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="inventory-form-section__quantity-container">
                            <label htmlFor="itemQuantity" className="inventory-form-section__quantity-label">
                                Quantity
                            </label>
                            <input
                                type="text"
                                id="itemQuantity"
                                name="itemQuantity"
                                className="inventory-form-section__quantity-input"
                                onChange={this.formHandler}
                            />
                        </div>

                        <div className="inventory-form-section__input-container inventory-form-section__input-container--size">
                            <label htmlFor="warehouse" className="inventory-form-section__label">
                                Warehouse
                            </label>
                            <select
                                type="text"
                                id="warehouse"
                                name="warehouseName"
                                className="inventory-form-section__input inventory-form-section__input--warehouse"
                                onChange={this.formHandler}
                                defaultValue={'string'}
                            >
                                {this.state.warehousesPairs?.map((item, i) => {
                                    return <option key={i}>{item.name}</option>

                                })}
                            </select>
                        </div>
                    </section>
                    <div className="inventory-form-section__clickables">
                        <Link to={`/inventory`} className='inventory-form-section__button-container'>
                            <button className="inventory-form-section__button inventory-form-section__button--cancel">
                                Cancel
                            </button>
                        </Link>
                        <button type="submit" className="inventory-form-section__button inventory-form-section__button--add">
                            Save
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default InventoryAdd;