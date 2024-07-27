"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../hooks";

export default function TransferMoney() {
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send Money">
          <TextInput
            placeholder="Number"
            label={"Number"}
            onChange={(val) => {
              setNumber(val);
            }}
          />
          <TextInput
            placeholder="Amount"
            label={"Amount"}
            onChange={(val) => {
              setAmount(val);
            }}
          />

          <br />

          <div className="flex justify-center">
            <Button
              onClick={async () => {
                await p2pTransfer(number, Number(amount) * 100);
              }}
            >
              Send Money
            </Button>
          </div>
        </Card>
      </Center>
    </div>
  );
}
