import React, { useState } from "react";

function UserOrderInfo() {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div>
      <div>
        <h4>My Current Orders</h4>
        <ul></ul>
      </div>
      <div>
        <h4>My Previous Orders</h4>
        <ul></ul>
        <button>View All</button>
      </div>
    </div>
  );
}

export default UserOrderInfo;
