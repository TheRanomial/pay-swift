"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";
import { revalidatePath } from "next/cache";

export async function getBalance() {
  const session = await getServerSession(authOptions);

  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

export async function getOnRamptransactions() {
  const session = await getServerSession(authOptions);

  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return transactions.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export async function getsentp2pransactions() {
  const session = await getServerSession(authOptions);

  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });

  revalidatePath("/transactions");

  return transactions.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    touser: t.toUserId,
  }));
}

export async function getreceivedp2pransactions() {
  const session = await getServerSession(authOptions);

  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: Number(session?.user?.id),
    },
  });

  revalidatePath("/transactions");

  return transactions.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    fromuser: t.fromUserId,
  }));
}

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }

  const token = (Math.random() * 1000).toString();

  await prisma.onRampTransaction.create({
    data: {
      provider,
      token,
      status: "Processing",
      startTime: new Date(),
      userId: Number(session?.user?.id),
      amount: amount * 100,
    },
  });

  revalidatePath("/transfers");

  return {
    message: "Done",
  };
}

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Error while sending",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }
  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(from) },
    });

    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: { userId: Number(from) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });

    await tx.p2pTransfer.create({
      data: {
        fromUserId: Number(from),
        toUserId: toUser.id,
        amount,
        timestamp: new Date(),
      },
    });
  });
}

export async function getUsername(id: number) {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  return {
    usernumber: user?.number!,
  };
}

export async function getUser() {
  const session = await getServerSession(authOptions);
  const userid = Number(session?.user?.id);

  if(!userid){
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: {
        equals: userid,
      },
    },
  });

  return {
    name: user?.name || "Unknown",
    number: user?.number || "",
  };
}
