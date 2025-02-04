import Header from "../home/header";
import { useSelector } from "react-redux";
import "./Orders.css";
const Orders = () => {
  const Orders = useSelector((state) => state.order.orders);
  console.log(Orders);

  return (
    <>
      <Header />
      <div className="Order-Table">
        <div className="container">
          <h1>Orders</h1>

          {Orders.map((order, orderIndex) => (
            <div key={order._id} className="order-block">
              {/* Order Header */}
              <h2>
                Order {orderIndex + 1} -{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </h2>

              {/* Order Details */}
              <div className="order-details">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Name:</strong> {order.name}
                </p>
                <p>
                  <strong>Contact:</strong> {order.contact}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Shipping Address:</strong> {order.shippingaddress}
                </p>
                <p>
                  <strong>Status:</strong> {order.orderStatus}
                </p>
                <p>
                  <strong>Total Payment:</strong> ${order.totalpayment}
                </p>
              </div>

              {/* Order Products Table */}
              <table className="table">
                <thead className="tableheader">
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody className="tablebody">
                  {order.products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.productname}</td>
                      <td>${product.productprice}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
