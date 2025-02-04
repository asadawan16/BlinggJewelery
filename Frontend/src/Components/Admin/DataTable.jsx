import { Fragment, useState } from "react";
import "./DataTable.css";

const DataTable = ({ products, children, title, Orders, state, users }) => {
  const [searchInput, setSearchInput] = useState("");
  const data =
    state === "product"
      ? products
      : state === "order"
      ? Orders
      : state === "user"
      ? users
      : null;
  console.log(data);

  const filteredData = data?.filter((item) =>
    state === "product"
      ? item.productname?.toLowerCase().includes(searchInput.toLowerCase())
      : state === "user"
      ? item.username?.toLowerCase().includes(searchInput.toLowerCase())
      : item.name?.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="Data-Table">
      <h1>{title}</h1>
      <div className="searchoption">
        <input
          type="text"
          placeholder="Search by name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <table className="table">
        <thead className="tableheader">
          <tr>{children}</tr>
        </thead>
        <tbody className="tablebody">
          {state === "product" ? (
            <>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.productname}</td>
                  <td>{item.productprice}</td>
                  <td>{item.category}</td>
                </tr>
              ))}
            </>
          ) : state === "order" ? (
            <>
              {filteredData.map((item, index) => (
                <Fragment key={index}>
                  {item.products?.length > 0 ? (
                    item.products.map((product, productIndex) => (
                      <tr key={productIndex}>
                        <td>{index + 1}</td>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{product.productname}</td>
                        <td>{product.quantity}</td>
                        <td>{product.productprice}</td>
                        <td>{item.orderStatus}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>{item.totalpayment}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No products available</td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </>
          ) : null}
          {state === "user" ? (
            <>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
