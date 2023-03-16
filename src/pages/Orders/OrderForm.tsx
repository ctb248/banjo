import { FC, useState } from "react";
import { formatDate } from "../../utils";
import { Order } from "./useOrders";

interface OrderFormProps {
  onSubmit: (newOrder: Order) => void;
  onCancel: () => void;
}

const OrderForm: FC<OrderFormProps> = ({ onSubmit, onCancel }) => {
  const [formValues, setFormValues] = useState<
    Pick<Order, "dueDate" | "teamMember" | "team" | "priority">
  >({
    teamMember: "",
    team: "Chartreuse",
    priority: "Low",
    dueDate: "2024-01-01",
  });

  const changeField = (field: string, value: string) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const field = e.target.getAttribute("name");
    const value = e.target.value;

    changeField(field as string, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { dueDate, ...rest } = formValues;
    onSubmit({
      ...rest,
      dueDate: formatDate(new Date(dueDate)),
      number: Math.floor(Math.random() * 99999),
    });
  };

  return (
    <div className="order-form">
      <div className="order-form-header">
        <h1>Create a New Order</h1>
        <p>
          Fill out the required information to submit a new order, except
          nothing is required.
        </p>
      </div>
      <div className="order-form-body">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Team Member</label>
            <input
              value={formValues.teamMember}
              onChange={handleChange}
              placeholder="Placeholder"
              name="teamMember"
              type="text"
              className="input"
            />
          </div>
          <div className="form-field">
            <label>Priority</label>
            <select
              name="priority"
              value={formValues.priority}
              onChange={handleChange}
              className="input select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-field">
            <label>Team</label>
            <select
              name="team"
              value={formValues.team}
              onChange={handleChange}
              className="input select"
            >
              <option value="Chartreuse">Chartreuse</option>
              <option value="Salmon">Salmon</option>
              <option value="Seafoam Green">Seafoam Green</option>
            </select>
          </div>
          <div className="form-field">
            <label>Due Date</label>
            <input
              name="dueDate"
              value={formValues.dueDate}
              onChange={handleChange}
              className="input"
              type="date"
              min="2024-01-01"
            />
            <span className="sub-label">
              Date format must be whatever your browser-derived locale specifies
            </span>
          </div>
          <div className="order-form-btns">
            <button onClick={onCancel} className="btn">
              Cancel
            </button>
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
