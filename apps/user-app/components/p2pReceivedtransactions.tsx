"use client";

import { Card } from "@repo/ui/card";
import { useEffect, useState } from "react";
import { getUsername } from "../hooks";

export const P2pReceivedtransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    fromuser: number;
  }[];
}) => {
  const [username, setUsernames] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchUsernumber = async () => {
      const receviedPromises = transactions.map((t) => getUsername(t.fromuser));
      const receivedUserNumber = await Promise.all(receviedPromises);

      const newUsernames: { [key: number]: string } = {};
      transactions.forEach((t, index) => {
        newUsernames[t.fromuser] = receivedUserNumber[index]?.usernumber || "";
      });

      setUsernames(newUsernames);
    };
    fetchUsernumber();
  }),
    [transactions];

  if (!transactions.length) {
    return (
      <Card title={"Received Transactions"}>
        <div className="text-center pb-8 pt-8">No Received transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Received Transactions">
      <div className="space-y-4">
        {transactions.map((t) => (
          <div
            key={t.time.getTime()}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  Received from {username[t.fromuser] || "Loading..."}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(t.time).toLocaleString()}
                </div>
              </div>
              <div className="text-xl font-bold text-green-600">
                + Rs {(t.amount / 100).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
