import { P2pReceivedtransactions } from "../../../components/p2pReceivedtransactions";
import { P2psenttransactions } from "../../../components/p2ptransactions";
import {
  getreceivedp2pransactions,
  getsentp2pransactions,
} from "../../../hooks";

export default async function page() {
  const transactions = await getsentp2pransactions();
  const receivedTransactions = await getreceivedp2pransactions();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <P2psenttransactions transactions={transactions} />
        <P2pReceivedtransactions transactions={receivedTransactions} />
      </div>
    </div>
  );
}
