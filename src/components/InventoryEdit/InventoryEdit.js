import { Component } from "react";
import { WAREHOUSES_API } from "../../utils/appConfig";
import "./InventoryEdit.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

class InventoryEdit extends Component {

    state = {
        id: "",
        warehouseID: "",
        itemName: "",
        description: "",
        category: "",
        status: "",
        warehouseName: "",
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
                                    return { name: item.name, id: item.id }
                                })
                                this.setState({
                                    warehousesPairs: locations,
                                    warehouseName: locations[0].name,
                                    warehouseID: locations[0].id
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

    formHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    editInventorySubmitHandler = (e) => {
        e.preventDefault();

        WAREHOUSES_API.editOne("inventories", this.state.id, {
            id: this.state.id,
            warehouseID: this.state.warehousesPairs.find(item => item.name === this.state.warehouseName).id,
            warehouseName: this.state.warehouseName,
            itemName: this.state.itemName,
            description: this.state.description,
            category: this.state.category,
            status: this.state.status
        });
    };

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            //do border top on both form sections
            <section className="inventory-formpage">
                <div className="inventory-formpage__top-container">
                    <img
                        alt="Back Arrow"
                        className="inventory-formpage__back-arrow"
                        src={backArrow}
                        onClick={this.goBack}
                    />
                    <h1 className="inventory-formpage__heading">Add New Inventory Item</h1>
                </div>
                <form
                    className="inventory-formpage__form inventory-form"
                    onSubmit={this.editInventorySubmitHandler}
                >
                    <section className="inventory-form__section inventory-form__section--details">
                        <h2 className="inventory-form__heading">Item Details</h2>
                        <div className="inventory-form__input-container">
                            <label htmlFor="itemName" className="inventory-form__label">
                                Item Name
                            </label>
                            <input
                                type="text"
                                id="itemName"
                                name="itemName"
                                className="inventory-form__input"
                                onChange={this.formHandler}
                                defaultValue={this.state.itemName}
                            />
                        </div>
                        <div className="inventory-form__input-container">
                            <label htmlFor="description" className="inventory-form__label">
                                Description
                            </label>
                            <textarea
                                type="text"
                                id="description"
                                name="description"
                                className="inventory-form__input inventory-form__input--textarea"
                                onChange={this.formHandler}
    
                            />
                        </div>
                        <div className="inventory-form__input-container">
                            <label htmlFor="category" className="inventory-form__label inventory-form__label--category">
                                Category
                            </label>
                            <select
                                type="text"
                                id="category"
                                name="category"
                                className="inventory-form__input inventory-form__input--category"
                                onChange={this.formHandler}
                            >
                                <option>Electronics</option>
                                <option>Gear</option>
                                <option>Apparel</option>
                                <option>Accessories</option>
                                <option>Health</option>

                            </select>
                        </div>
                    </section>
                    <section className="inventory-form__section inventory-form__section--availability">
                        <h2 className="inventory-form__heading">Item Availability</h2>
                        <div className="inventory-form__input-container inventory-form__input-container--size">
                            <label htmlFor="status" className="inventory-form__label">
                                Status
                            </label>
                            <div className="inventory-form__radios">
                                <div className="inventory-form__radio">
                                    <input
                                        type="radio"
                                        id="status"
                                        name="status"
                                        value='In stock'
                                        className="inventory-form__input inventory-form__input--status"
                                        onChange={this.formHandler}
                                        checked
                                    />
                                    <label htmlFor="inStock" className="inventory-form__label inventory-form__label--status">
                                        In stock
                                    </label>
                                </div>
                                <div className="inventory-form__radio">
                                    <input
                                        type="radio"
                                        id="status"
                                        name="status"
                                        value='Out of Stock'
                                        className="inventory-form__input inventory-form__input--status"
                                        onChange={this.formHandler}
                                    />
                                    <label htmlFor="OutOfStock" className="inventory-form__label inventory-form__label--status">
                                        Out of stock
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="inventory-form__quantity-container">
                            <label htmlFor="itemName" className="inventory-quantity__label">
                                Quantity
                            </label>
                            <input
                                type="text"
                                id="itemQuantity"
                                name="itemQuantity"
                                className="inventory-form__quantity-input"
                                onChange={this.formHandler}
                            />
                        </div>

                        <div className="inventory-form__input-container inventory-form__input-container--size">
                            <label htmlFor="warehouse" className="inventory-form__label">
                                Warehouse
                            </label>
                            <select
                                type="text"
                                id="warehouse"
                                name="warehouseName"
                                className="inventory-form__input inventory-form__input--warehouse"
                                onChange={this.formHandler}
                                defaultValue={this.state.warehouseName}
                            >
                                {this.state.warehousesPairs?.map((item, i) => {
                                    return <option key={i}>{item.name}</option>

                                })}
                            </select>
                        </div>
                    </section>
                    <div className="inventory-form__clickables">
                        <Link to={`/inventory`} className='inventory-form__button-container'>
                            <button className="inventory-form__button inventory-form__button--cancel">
                                Cancel
                            </button>
                        </Link>
                        <button type="submit" className="inventory-form__button inventory-form__button--add">
                            Save
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default InventoryEdit;
