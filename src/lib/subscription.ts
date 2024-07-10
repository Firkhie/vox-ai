import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";
import { addMonths, differenceInDays, format, isBefore, parse } from "date-fns";

interface AddSubscriptionProps {
  transactionTime: string;
}

export async function addSubscription(props: AddSubscriptionProps) {
  try {
    const { userId } = auth();
    const { transactionTime } = props;
    console.log("transaction_time", transactionTime);
    const parsedDate = parse(
      transactionTime,
      "yyyy-MM-dd HH:mm:ss",
      new Date(),
    );
    console.log("parsedDate", parsedDate);
    const newPeriodEnd = addMonths(parsedDate, 1);
    console.log("newPeriodEnd", newPeriodEnd);
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId: userId! },
    });

    if (!userSubscription) {
      await prismadb.userSubscription.create({
        data: { userId: userId!, midtransCurrentPeriodEnd: newPeriodEnd },
      });
    } else {
      const currentPeriodEnd = userSubscription.midtransCurrentPeriodEnd;
      let updatedPeriodEnd;

      if (isBefore(currentPeriodEnd!, new Date())) {
        updatedPeriodEnd = newPeriodEnd;
      } else {
        updatedPeriodEnd = addMonths(currentPeriodEnd!, 1);
      }
      await prismadb.userSubscription.update({
        where: { userId: userId! },
        data: {
          midtransCurrentPeriodEnd: updatedPeriodEnd,
          updatedAt: new Date(),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function checkSubscription() {
  const { userId } = auth();
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId: userId! },
  });
  if (!userSubscription) {
    return false;
  }
  const isValid =
    userSubscription.midtransCurrentPeriodEnd?.getTime()! > Date.now();
  return !!isValid;
}

export async function getSubscription() {
  const { userId } = auth();
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId: userId! },
  });

  if (!userSubscription || !userSubscription.midtransCurrentPeriodEnd) {
    return "-";
  }

  const currentDate = new Date();
  const periodEndDate = new Date(userSubscription.midtransCurrentPeriodEnd);
  const daysRemaining = differenceInDays(periodEndDate, currentDate);

  if (daysRemaining > 0) {
    return format(periodEndDate, "d MMMM yyyy");
  } else {
    return "-";
  }
}

export async function getSubscriptionDays() {
  const { userId } = auth();
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId: userId! },
  });

  if (!userSubscription || !userSubscription.midtransCurrentPeriodEnd) {
    return 0;
  }

  const currentDate = new Date();
  const periodEndDate = new Date(userSubscription.midtransCurrentPeriodEnd);
  const daysRemaining = differenceInDays(periodEndDate, currentDate);

  return daysRemaining > 0 ? daysRemaining : 0;
}
