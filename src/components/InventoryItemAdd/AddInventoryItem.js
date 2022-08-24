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
        category: "",
        status: "",
        warehouseName: "",
        warehousesNames: [],
        warehousesData: [],
        allInventories: [],
    };

    filtered = new Set();

    filteredArr = []

    componentDidMount() {
        if (this.props.match.params.inventoryId) {
            WAREHOUSES_API.getOne(
                "inventories", this.props.match.params.inventoryId
            ).then((res) => {
                this.setState({
                    id: res.data.id,
                    itemName: res.data.itemName,
                    description: res.data.description,
                    category: res.data.category,
                    status: res.data.status,
                    warehouseName: res.data.warehouseName
                });
            })
                .then(() => {
                    WAREHOUSES_API.getAll(
                        'inventories'
                    ).then(res => {
                        this.setState({
                            allInventories: res.data
                        })
                    })
                        .then(res => {
                            WAREHOUSES_API.getAll(
                                'warehouses'
                            ).then(res => {
                                const locations = res.data.map(item => {
                                    return item.warehouseName
                                })
                                this.setState({
                                    warehousesNames: locations,
                                    warehousesData: res.data
                                })
                            })
                        })
                })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params !== this.props.match.params) {
            WAREHOUSES_API.getOne(
                "inventories",
                this.props.match.params.inventoryId
            ).then((res) => {
                this.setState({
                    id: res.data.id,
                    itemName: res.data.itemName,
                    description: res.data.description,
                    category: res.data.category,
                    status: res.data.status,
                    warehouseName: res.data.warehouseName
                });
            });
        }
    }

    clickHandler = () => {
        const foundObj = this.state.warehousesData.find(item => item.name === this.state.warehouseName)

        this.setState({
            warehouseID: foundObj.id
        })

    }

    formHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

        this.clickHandler()
    };

    editInventorySubmitHandler = (e) => {
        e.preventDefault();

        WAREHOUSES_API.editOne("inventories", this.state.id, {
            id: this.state.id,
            warehouseID: this.state.warehouseID,
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
                    <img
                        alt="Back Arrow"
                        className="inventory-add__back-arrow"
                        src={backArrow}
                    />
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
                                defaultValue={this.state.itemName}
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
                                defaultValue={this.state.description}
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
                                defaultValue={this.state.category}
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
                                        checked
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
                                defaultValue={this.state.itemName}
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
                                defaultValue={this.state.warehousesNames}
                            >
                                {this.state.warehousesNames.map((item, i) => {
                                    return <option key={i}>{item}</option>

                                })}
                            </select>
                        </div>
                    </section>
                    <div className="inventory-form-section__clickables">
                        <Link to={`/`} className='inventory-form-section__button-container'>
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
