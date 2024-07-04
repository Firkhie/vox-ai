import { MAX_FREE_COUNTS } from "@/constant";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export async function checkApiLimit() {
  const { userId } = auth();

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: userId! },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  }
  return false;
}

export async function addApiLimit() {
  const { userId } = auth();

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: userId! },
  });

  if (!userApiLimit) {
    await prismadb.userApiLimit.create({ data: { count: 1, userId: userId! } });
  } else {
    await prismadb.userApiLimit.update({
      where: { userId: userId! },
      data: { count: userApiLimit.count + 1 },
    });
  }
}

export async function getApiLimit() {
  const { userId } = auth();

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: userId! },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
}
