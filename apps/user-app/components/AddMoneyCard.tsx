"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOnRampTransaction } from "../hooks";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setprovider] = useState(SUPPORTED_BANKS[0]?.name || "");

  const [amount, setAmount] = useState(0);

  return (
    <Card title="Add Money">
      <TextInput
        placeholder="Amount"
        label={"Amount"}
        onChange={(val) => {
          setAmount(Number(val));
        }}
      />

      <div>bank</div>

      <Select
        onSelect={(value) => {
          setRedirectUrl(
            SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
          );
        }}
        options={SUPPORTED_BANKS.map((x) => ({
          key: x.name,
          value: x.name,
        }))}
      />

      <br />

      <div>
        <Button
          onClick={async () => {
            await createOnRampTransaction(provider, amount);
          }}
        >
          Add Money
        </Button>
      </div>
    </Card>
  );
};
