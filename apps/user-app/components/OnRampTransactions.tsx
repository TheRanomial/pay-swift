import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  const getStatusButtonStyle = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-green-500 text-white";
      case "Processing":
        return "bg-yellow-500 text-black";
      case "Failure":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };
  if (!transactions.length) {
    return (
      <Card title={"Recent Transactions"}>
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title={"Recent Transactions"}>
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between mb-4">
            <div>
              <div className="text-sm">Received from {t.provider}</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
            <button
              className={`px-2 py-0.5 text-xs rounded ${getStatusButtonStyle(t.status)}`}
            >
              {t.status}
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};
