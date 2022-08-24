import { WAREHOUSES_API } from "../../utils/appConfig";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
// import { render } from "@testing-library/react";
import { Component } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";

class WarehouseAdd extends Component {
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

  formHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addWarehouseSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e);

    WAREHOUSES_API.postOne("warehouses", {
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
  render() {
    return (
      <section className="warehouse-formpage">
        <div className="warehouse-formpage__top-container">
          <Link to={'/warehouses'}><img
            alt="Back Arrow"
            className="warehouse-formpage__back-arrow"
            src={backArrow}
          /> </Link>
          <h1 className="warehouse-formpage__heading">Add New Warehouse</h1>
        </div>
        <form
          type="submit"
          className="warehouse-formpage__form warehouse-form"
          onSubmit={this.addWarehouseSubmitHandler}
        >
          <section className="warehouse-form__section warehouse-form__section--details">
            <h2 className="warehouse-form__heading">Warehouse Details</h2>
            <div className="warehouse-form__input-container">
              <label htmlFor="warehouseName" className="warehouse-form__label">
                Warehouse Name
              </label>
              <input
                onChange={this.formHandler}
                type="text"
                id="warehouseName"
                name="warehouseName"
                className="warehouse-form__input"
                placeholder="Warehouse Name"
              />
            </div>
            <div className="warehouse-form__input-container">
              <label htmlFor="address" className="warehouse-form__label">
                Street Address
              </label>
              <input
                onChange={this.formHandler}
                type="text"
                id="address"
                name="address"
                className="warehouse-form__input"
                placeholder="Street Address"
              />
            </div>
            <div className="warehouse-form__input-container">
              <label htmlFor="city" className="warehouse-form__label">
                City
              </label>
              <input
                onChange={this.formHandler}
                type="text"
                id="city"
                name="city"
                className="warehouse-form__input"
                placeholder="City"
              />
            </div>
            <div className="warehouse-form__input-container">
              <label htmlFor="country" className="warehouse-form__label">
                Country
              </label>
              <input
                onChange={this.formHandler}
                type="text"
                id="country"
                name="country"
                className="warehouse-form__input"
                placeholder="Country"
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
                onChange={this.formHandler}
                type="text"
                id="contactName"
                name="contactName"
                className="warehouse-form__input"
                placeholder="Contact Name"
              />
            </div>
            <div className="warehouse-form__input-container warehouse-form__input-container--size">
              <label htmlFor="position" className="warehouse-form__label">
                Position
              </label>
              <input
                onChange={this.formHandler}
                type="text"
                id="position"
                name="position"
                className="warehouse-form__input"
                placeholder="Position"
              />
            </div>
            <div className="warehouse-form__input-container warehouse-form__input-container--size">
              <label htmlFor="phone" className="warehouse-form__label">
                Phone Number
              </label>
              <input
                onChange={this.formHandler}
                type="text"
                id="phone"
                name="phone"
                className="warehouse-form__input"
                placeholder="Phone Number"
              />
            </div>
            <div className="warehouse-form__input-container warehouse-form__input-container--size">
              <label htmlFor="email" className="warehouse-form__label">
                Email
              </label>
              <input
                onChange={this.formHandler}
                type="text"
                id="email"
                name="email"
                className="warehouse-form__input"
                placeholder="Email"
              />
            </div>
          </section>
          <div className="warehouse-form__clickables">
            <Link to={`/warehouses`} className='inventory-form__button-container'>
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

export default WarehouseAdd;
