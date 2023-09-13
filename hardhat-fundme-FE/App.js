import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";
import { ethers } from "ethers";

const AppActions = () => {
  const [connStatus, setStatus] = useState(false);

  const handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  return (
    <div className="buttons-container">
      <button onClick={handleConnect}>
        {connStatus ? "Connected" : "Connect to MetaMask"}
      </button>
      <button>Get funds</button>
      <button>withdraw</button>
    </div>
  );
};

const UserInput = () => {
  const fundETH = async () => {
    //change
    const provider = new ethers();
  };
  return (
    <div className="user-input">
      <input type="text" name="funds" placeholder="0.01" />
      <button onClick={fundETH}>fund</button>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app-container">
      <AppActions />
      <UserInput />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
