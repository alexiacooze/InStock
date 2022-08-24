import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import WarehouseAdd from "./components/WarehouseAdd/WarehouseAdd";
import WarehouseEdit from "./components/WarehouseEdit/WarehouseEdit";
import InventoryItemDetails from "./components/InventoryItemDetails/InventoryItemDetails";
import InventoryList from "./components/InventoryList/InventoryList";
import InventoryEdit from "./components/InventoryEdit/InventoryEdit";
import InventoryAdd from "./components/AddInventoryItem/AddInventoryItem";

function App() {
    return (
      <BrowserRouter>
      <Header />
      <Redirect from='/' to={'/warehouses'} />
        <Switch>
          <Route path="/warehouses" exact component={WarehouseList} />
          <Route path="/warehouses/add" component={WarehouseAdd} />
          <Route path="/warehouses/:warehouseId/edit" exact component={WarehouseEdit} />
          <Route path="/warehouses/:warehouseId" component={WarehouseDetails} />
          <Route path='/inventory' exact component={InventoryList}/>
          <Route path='/inventory/add' exact component={InventoryAdd}/>
          <Route path="/inventory/:inventoryId" exact component={InventoryItemDetails} />
          <Route path='/inventory/:inventoryId/edit' component={InventoryEdit} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }

export default App;
