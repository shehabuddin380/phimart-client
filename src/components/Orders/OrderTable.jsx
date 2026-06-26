import OrderItems from "./OrderItems";

const OrderTable = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-base-200 border-b border-base-300">
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">Quantity</th>
            <th className="px-4 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <OrderItems key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;