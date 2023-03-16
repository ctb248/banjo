import { FC, useState } from "react";
import Modal from "react-modal";
import Priority from "../../components/Priority/Priority";
import Table, { Column } from "../../components/table/Table";
import OrderForm from "./OrderForm";
import type { Order } from "./useOrders";
import useOrders from "./useOrders";
import "./Orders.scss";

const OrdersPage: FC = () => {
  const [orders, setOrders] = useOrders(30);
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const columns: Column<Order>[] = [
    {
      key: "teamMember",
      title: "Team Member",
      className: "semi-bold",
    },
    {
      key: "priority",
      title: "Priority",
      render: (value) => <Priority level={value} />,
    },
    {
      key: "number",
      title: "Order Number",
    },
    {
      key: "team",
      title: "Team",
      className: "team",
    },
    {
      key: "dueDate",
      title: "Due Date",
    },
    {
      renderKey: "computedCol",
      render: () => <span>...</span>,
    },
  ];

  const handleSubmit = (order: Order) => {
    const newOrder = order.teamMember
      ? order
      : { ...order, teamMember: "I am a human person" };
    setOrders([...orders, newOrder]);
    closeModal();
  };

  return (
    <div className="orders">
      <div className="orders-header">
        <h1>Orders</h1>
        <button onClick={openModal} className="btn btn-primary">
          New Order
        </button>
      </div>
      <Table<Order> columns={columns} data={orders} pageSize={10} />

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fffffa",
          },
        }}
      >
        <OrderForm onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default OrdersPage;
