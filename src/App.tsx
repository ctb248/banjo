import "./App.scss";
import OrdersPage from "./pages/Orders/Orders";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  return (
    <div className="App">
      <OrdersPage />
    </div>
  );
}

export default App;
