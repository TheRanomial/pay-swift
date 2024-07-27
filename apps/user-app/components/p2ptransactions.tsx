"use client";

import { Card } from "@repo/ui/card";
import { useEffect, useState } from "react";
import { getUsername } from "../hooks";

export const P2psenttransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    touser: number;
  }[];
}) => {
  const [usernames, setUsernames] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernamePromises = transactions.map((t) => getUsername(t.touser));
      const usernameResults = await Promise.all(usernamePromises);

      const newUsernames: { [key: number]: string } = {};
      transactions.forEach((t, index) => {
        newUsernames[t.touser] = usernameResults[index]?.usernumber || "";
      });

      setUsernames(newUsernames);
    };

    fetchUsernames();
  }, [transactions]);

  if (!transactions.length) {
    return (
      <Card title={"Sent Transactions"}>
        <div className="text-center pb-8 pt-8">No Sent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Sent Transactions">
      <div className="space-y-4">
        {transactions.map((t) => (
          <div key={t.time.getTime()} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  Sent to {usernames[t.touser] || "Loading..."}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(t.time).toLocaleString()}
                </div>
              </div>
              <div className="text-xl font-bold text-red-600">
                - Rs {(t.amount / 100).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};


