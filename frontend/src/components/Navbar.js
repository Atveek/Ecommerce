import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
// import icon from "icon.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handlesearch = this.handlesearch.bind(this);
    this.state = {
      toggleButton: false,
      isLargeScreen: true,
      isSearch: false,
    };
  }

  componentDidMount() {
    // Add a resize event listener to update the state when the screen size changes
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    // Remove the resize event listener to prevent memory leaks
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    const isLargeScreen = window.innerWidth > 640; // Adjust the threshold as needed

    // Update the state based on the screen size
    this.setState({
      isLargeScreen,
      isSearch: isLargeScreen,
      toggleButton: isLargeScreen, // Automatically set isToggled to false on large screens
    });
  };

  handleToggle() {
    this.setState((prevState) => ({
      toggleButton: !prevState.toggleButton,
    }));
  }
  handlesearch() {
    this.setState((prevState) => ({
      isSearch: !prevState.isSearch,
    }));
    window.scrollTo({ top: "0px", left: "0px", behavior: "smooth" });
    console.log("handleSearch...", this.isSearch);
  }
  render() {
    const { user } = this.props;
    const { toggleButton, isLargeScreen, isSearch } = this.state;
    console.log(this.state.toggleButton);
    if (user === "") {
      return null;
    }
    return (
      <>
        <div className="w-full sticky top-0 z-10">
          {user === "buyer" && (
            <ul className="flex w-full flex-col bg-teal-500 sm:flex-row sd:gap-2 lg:gap-3 justify-around m-0 py-5 text-xl bg-b">
              <div className="flex  gap-7 justify-between px-5 text-xl ">
                <Link
                  className="md:text-base  lg:text-2xl font-bold text-left py-2"
                  to="/"
                >
                  <img
                    className="w-8 inline-block"
                    src="/image/icon.png"
                    alt="icon"
                  />
                  LuxeCart
                </Link>
                <div className="flex flex-row gap-4">
                  <button
                    className="block sm:hidden m-0"
                    onClick={this.handlesearch}
                  >
                    <img
                      className="w-6 m-0"
                      src="/image/search.png"
                      alt="search"
                    />
                  </button>
                  <button
                    className="block sm:hidden"
                    onClick={this.handleToggle}
                  >
                    &#9776;
                  </button>
                </div>
              </div>
              {isLargeScreen &&
                (window.innerWidth > 640 ? true : toggleButton) && (
                  <>
                    <div
                      className="flex flex-col sm:flex-row  gap-1 sm:gap-3 py-3 border-t-2 sm:border-0  lg:gap-5 justify-between px-5 text-xl "

                      // className=" mt-5 sm:mt-0 border-t-2 sm:border-0 sm:flex-row gap-3 lg:gap-5 justify-between px-5 text-xl "
                    >
                      <li>
                        <form className="flex flex-row gap-1">
                          <input
                            type="search"
                            className="hidden md:inline-block md:w-48 lg:w-72  xl:w-96 outline"
                          />
                          <button
                            type="submit"
                            className=" hidden md:inline-block text-base lg:tex-xl px-3 lg:px-5 py-1 text-center text-white bg-black "
                          >
                            Search
                          </button>
                        </form>
                      </li>

                      {/* <li>
                      <Link to="/">Home</Link>
                    </li> */}
                      <li>
                        <Link to="/account">Account</Link>
                      </li>
                      <li>
                        <Link to="/cart">Cart</Link>
                      </li>
                      <li>
                        <Link to="/order">Orders</Link>
                      </li>
                    </div>
                    <div className="flex   justify-between text-xl  pl-5 pr-1">
                      <li>
                        <Logout />
                      </li>
                    </div>
                  </>
                )}
            </ul>
          )}
          {user === "seller" && (
            <ul className="flex w-full flex-col  sm:flex-row md:gap-7 justify-around py-5 text-xl ">
              <div className="flex  gap-7 justify-between px-5 text-xl ">
                <h2 className="text-2xl font-bold text-left">LuxeCart</h2>
                <button className="block sm:hidden" onClick={this.handleToggle}>
                  &#9776;
                </button>
              </div>
              {(toggleButton || isLargeScreen) && (
                <>
                  <div className="flex  gap-7 justify-between px-5 text-xl ">
                    <li>
                      <Link to="/seller">Home</Link>
                    </li>
                    <li>
                      <Link to="/seller/account">Account</Link>
                    </li>
                    <li>
                      <Link to="seller/products">Products</Link>
                    </li>
                    <li>
                      <Link to="seller/order">Orders</Link>
                    </li>
                  </div>
                  <div className="flex   justify-between text-xl  px-5">
                    <li>
                      <Logout />
                    </li>
                  </div>
                </>
              )}
            </ul>
          )}
        </div>
        {isSearch && (
          <form className="flex w-full gap-4 justify-center mt-5">
            <input
              type="search"
              className="md:hidden py-2 w-60 sm:w-96 outline"
            />
            <button
              type="submit"
              className="md:hidden inline-block px-5 py-1 text-center text-white bg-black "
            >
              Search
            </button>
            {""}
          </form>
        )}
      </>
    );
  }
}

export default Navbar;
