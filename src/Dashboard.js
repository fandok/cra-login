import { useEffect, useState } from "react";

const Dashboard = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://bootcamp-rent-cars.herokuapp.com/customer/v2/order",
          {
            headers: {
              access_token: props.user.access_token,
            },
          }
        );

        const dataOrders = await response.json();
        setOrders(dataOrders.orders);
      } catch (e) {
        console.error(e);
      }
    };

    fetchOrders();
  }, [props.user.access_token]);

  return (
    <ul>
      {orders.map((order, index) => (
        <li key={index}>{order.total_price}</li>
      ))}
      <button
        onClick={() => {
          localStorage.removeItem("user");
        }}
      >
        Logout
      </button>
    </ul>
  );
};

export default Dashboard;
