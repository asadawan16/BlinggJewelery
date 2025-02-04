import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import SideNav from "./SideNav";
import DataTable from "./DataTable";
import logo from "../../assets/blingg-logo.png";
import usericon from "../../assets/user-icon.png";
import ordericon from "../../assets/query-icon.png";
import producticon from "../../assets/user-icon.png";
import "./AdminDashboard.css";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [profileToggle, setProfileToggle] = useState(false);
  const products = useSelector((state) => state.product.products);
  const Orders = useSelector((state) => state.order.orders);
  const users = useSelector((state) => state.user.users);
  console.log(users);
  const OptionData = [
    {
      id: 1,
      title: "Total Users",
      icon: usericon,
      component: "totalUsers",
      value: 0,
    },
    {
      id: 2,
      title: "Total Orders",
      icon: ordericon,
      component: "totalOrders",
      value: Orders.length,
    },
    {
      id: 3,
      title: "Total Products",
      icon: producticon,
      component: "totalProducts",
      value: products.length,
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "totalUsers":
        return (
          <DataTable title="Total Users">
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </DataTable>
        );

      case "totalOrders":
        return (
          <DataTable
            title="Total Orders"
            showSearchBar={true}
            Orders={Orders}
            state="order"
          >
            <th>Order No.</th>
            <th>Order ID</th>
            <th>User</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
            <th>Payment</th>
          </DataTable>
        );

      case "totalProducts":
        return (
          <DataTable title="Total Products" products={products} state="product">
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
          </DataTable>
        );

      default:
        return (
          <div className="admin-dashboard">
            <h1>Welcome to the Admin Dashboard</h1>
          </div>
        );
    }
  };

  return (
    <>
      <div className="header-top">
        <div className="admin-logo">
          <Link to={"/home"}>
            <img src={logo} alt="Blingg Jewelry Store" />
          </Link>
        </div>
        <div className="profile">
          <Link onClick={() => setProfileToggle(!profileToggle)}>
            <FaRegUser id="profile-icon" />
            <ul
              id="profile-dropdown"
              style={{ display: profileToggle ? "block" : "none" }}
            >
              <li>
                <Link to={"/"} onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </Link>
        </div>
      </div>
      <div id="admin-portal">
        <SideNav />
        <div className="admin-dashboard">
          <h1>Dashboard</h1>
          <ul className="option-grid">
            {OptionData.map((option) => (
              <li
                key={option.id}
                className="option"
                onClick={() => setActiveComponent(option.component)}
              >
                <div className="option-info">
                  <h2>{option.title}</h2>
                  <p>{option.value}</p>
                </div>
                <div className="option-icon">
                  <img src={option.icon} alt={option.title} />
                </div>
              </li>
            ))}
          </ul>
          <div className="component-container">{renderActiveComponent()}</div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
