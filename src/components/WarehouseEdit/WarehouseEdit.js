import { Component } from "react";
import { WAREHOUSES_API } from "../../utils/appConfig";
import "./WarehouseAdd-Edit.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

class WarehouseEdit extends Component {
  state = {
    warehouseName: "",
    address: "",
    city: "",
    country: "",
    contactName: "",
    position: "",
    phone: "",
    email: "",
  };

  componentDidMount() {
    if (this.props.match.params.warehouseId) {
      WAREHOUSES_API.getOne(
        "warehouses",
        this.props.match.params.warehouseId
      ).then((res) => {
        this.setState({
          warehouseName: res.data[0].warehouse.name,
          address: res.data[0].warehouse.address,
          city: res.data[0].warehouse.city,
          country: res.data[0].warehouse.country,
          contactName: res.data[0].warehouse.contact.name,
          position: res.data[0].warehouse.contact.position,
          phone: res.data[0].warehouse.contact.phone,
          email: res.data[0].warehouse.contact.email,
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      WAREHOUSES_API.getOne(
        "warehouses",
        this.props.match.params.warehouseId
      ).then((res) => {
        this.setState({
          warehouseName: res.data[0].warehouse.name,
          address: res.data[0].warehouse.address,
          city: res.data[0].warehouse.city,
          country: res.data[0].warehouse.country,
          contactName: res.data[0].warehouse.contact.name,
          position: res.data[0].warehouse.contact.position,
          phone: res.data[0].warehouse.contact.phone,
          email: res.data[0].warehouse.contact.email,
        });
      });
    }
  }

  formHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  editWarehouseSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e);

    WAREHOUSES_API.editOne("warehouses", this.props.match.params.warehouseId, {
      name: this.state.warehouseName,
      address: this.state.address,
      city: this.state.city,
      country: this.state.country,
      contact: {
        name: this.state.contactName,
        position: this.state.position,
        phone: this.state.phone,
        email: this.state.email,
      },
    });
  };

  goBack = () => [
    this.props.history.goBack()
  ]

  render() {
    return (
      //do border top on both form sections
      <section className="warehouse-formpage">
        <div className="warehouse-formpage__top-container">
          <img
            alt="Back Arrow"
            className="warehouse-formpage__back-arrow"
            src={backArrow}
            onClick={this.goBack}
          />
          <h1 className="warehouse-formpage__heading">Edit Warehouse</h1>
        </div>
        <form
          className="warehouse-formpage__form warehouse-form"
          onSubmit={this.editWarehouseSubmitHandler}
        >
          <section className="warehouse-form__section warehouse-form__section--details">
            <h2 className="warehouse-form__heading">Warehouse Details</h2>
            <div className="warehouse-form__input-container">
              <label htmlFor="warehouseName" className="warehouse-form__label">
                Warehouse Name
              </label>
              <input
                type="text"
                id="warehouseName"
                name="warehouseName"
                className="warehouse-form__input"
                onChange={this.formHandler}
                defaultValue={this.state.warehouseName}
              />
            </div>
            <div className="warehouse-form__input-container">
              <label htmlFor="address" className="warehouse-form__label">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="warehouse-form__input"
                onChange={this.formHandler}
                defaultValue={this.state.address}
              />
            </div>
            <div className="warehouse-form__input-container">
              <label htmlFor="city" className="warehouse-form__label">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="warehouse-form__input"
                onChange={this.formHandler}
                defaultValue={this.state.city}
              />
            </div>
            <div className="warehouse-form__input-container">
              <label htmlFor="country" className="warehouse-form__label">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className="warehouse-form__input"
                onChange={this.formHandler}
                defaultValue={this.state.country}
              />
            </div>
          </section>
          <section className="warehouse-form__section warehouse-form__section--contact">
            <h2 className="warehouse-form__heading">Contact Details</h2>
            <div className="warehouse-form__input-container warehouse-form__input-container--size">
              <label htmlFor="contactName" className="warehouse-form__label">
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                className="warehouse-form__input"
                onChange={this.formHandler}
                defaultValue={this.state.contactName}
              />
            </div>
            <div className="warehouse-form__input-container warehouse-form__input-container--size">
              <label htmlFor="position" className="warehouse-form__label">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                className="warehouse-form__input"
                onChange={this.formHandler}
                defaultValue={this.state.position}
              />
            </div>
            <div className="warehouse-form__input-container warehouse-form__input-container--size">
              <label htmlFor="phone" className="warehouse-form__label">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="warehouse-form__input"
                onChange={this.formHandler}
                defaultValue={this.state.phone}
              />
            </div>
            <div className="warehouse-form__input-container warehouse-form__input-container--size">
              <label htmlFor="email" className="warehouse-form__label">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="warehouse-form__input"
                onChange={this.formHandler}
                defaultValue={this.state.email}
              />
            </div>
          </section>
          <div className="warehouse-form__clickables">
            <Link to={`/warehouses`} className='inventory-form__button-container'>
              <button onClick={this.goBack} className="inventory-form__button inventory-form__button--cancel">
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

export default WarehouseEdit;
