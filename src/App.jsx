import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ServicePolicies from "./pages/ServicePolicies";
import NotFound from "./pages/NotFound";

import PDP from "./pages/PDP";
import CartPage from "./pages/Cart";
import DeliveryPage from "./pages/DeliveryPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import OrderHistoryPage from "./pages/OrderHistory";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

import Counter from "./pages/Counter";

import Header, { SeesionHeader } from "./components/Header";
import Footer, { SeesionFooter } from "./components/Footer";
import Spinner from "./components/Spinner";
import Breadcrumb from "./components/Breadcrumb";
import ScrollToTop from "./components/ScrollToTop";

const MainLayout = ({ children }) => (
  <>
    <Header />
    <Breadcrumb />
    {children}
    <Footer />
  </>
);

const SessionLayout = ({ children }) => (
  <div className="d-flex flex-column h-100 pl-2">
    <SeesionHeader />
    {children}
    <SeesionFooter />
  </div>
);

class App extends Component {
  render() {
    const { spinner } = this.props;

    return (
      <ScrollToTop>
        <Switch>
          <Route exact path={["/login", "/register", "/forgotPassword"]}>
            <SessionLayout>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Registration />
                </Route>
                <Route path="/forgotPassword">
                  <ForgotPassword />
                </Route>
              </Switch>
            </SessionLayout>
          </Route>
          <Route
            exact
            path={[
              "/aboutUs",
              "/contactUs",
              "/servicePolicies",
              "/products/:skuId/:productName",
              "/cart",
              "/delivery",
              "/payment",
              "/confirmation",
              "/user/orders",
              "/",
            ]}
          >
            <MainLayout>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/products/:skuId/:productName">
                  {({ match }) => <PDP match={match} />}
                </Route>
                <Route path="/cart">
                  <CartPage />
                </Route>
                <Route path="/delivery">
                  <DeliveryPage />
                </Route>
                <Route path="/payment">
                  <PaymentPage />
                </Route>
                <Route path="/user/orders">
                  <OrderHistoryPage />
                </Route>
                <Route path="/confirmation">
                  {(props) => {
                    if (props.history.action === "POP") {
                      return <Redirect to="/cart" />;
                    }

                    return <ConfirmationPage />;
                  }}
                </Route>
                <Route path="/aboutUs">
                  <AboutUs />
                </Route>
                <Route path="/contactUs">
                  <ContactUs />
                </Route>
                <Route path="/servicePolicies">
                  <ServicePolicies />
                </Route>
              </Switch>
            </MainLayout>
          </Route>
          <Route path={["/counter"]}>
            <Counter />
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
        {spinner && <Spinner />}
      </ScrollToTop>
    );
  }
}

export default connect((state) => ({ spinner: state.spinner }))(App);
