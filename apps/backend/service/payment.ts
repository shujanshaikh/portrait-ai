import { PlanType } from "@prisma/client";
import { prisma } from "db";
import crypto from "crypto";
import Razorpay from "razorpay";


const RAZORPAY_KEY = Bun.env.KEY_ID;
const RAZORPAY_SECRET = Bun.env.KEY_SECRET


export const PLAN_INFO = {
  basic: 1000,
  pro: 3000,
  premium: 5000
} as const;

export const CREDITS_PER_PLAN = {
  basic: 500,
  pro: 1000,
  premium: 2000,
} as const;


const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY,
  key_secret: RAZORPAY_SECRET,
})

export async function createPaymentRecord(
  userId: string,
  paymentId: string,
  plan: PlanType,
  amount: number,
  orderId: string,
  status: "PENDING" | "SUCCESS" | "FAILED" = "PENDING"
) {
  try {
    return await withRetry(() =>
      prisma.transaction.create({
        data: {
          userId,
          amount,
          orderId,
          status,
          paymentId,
          plan
        }
      })
    )
  } catch (error) {
    console.log("unable to create a transaction")
    throw error
  }
}


async function withRetry<T>(
  operation: () => Promise<T>,
  retry = 3,
  delay = 1000,
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retry > 0) {
      error instanceof Error &&
        error.message.includes("Cant reach the database")
    } {
      console.log("Error while trying", `${retry} no of retry`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return withRetry(operation, retry - 1, delay * 2)
    }

  }

}



export async function razorPayment(
  userId: string,
  plan: keyof typeof PLAN_INFO
) {
  try {
    const amount = PLAN_INFO[plan];
    const amountinPaise = amount * 100;


    const orderData = {
      amount: amountinPaise,
      currency: "INR",
      receipt: `recp_${Date.now()}`,
      notes: {
        userId,
        plan
      }
    }

    const order = new Promise((resolve, reject) => {
      razorpay.orders.create(orderData, (err, result) => {
        if (err) reject(err);
        resolve((err))
      })
    })

    await createPaymentRecord(
      userId,
      "INR",
      (order as any).id,
      amount,
      plan,
      "PENDING"
    );

    return {
      key: Bun.env.KEY_ID,
      amount: amountinPaise,
      name: "POTRAIT-Ai",
      description: `${plan.toUpperCase()} Plan - ${CREDITS_PER_PLAN[plan]} Credits`,
      orderId: (order as any).id,
      profile: {
        name: "",
        email: ""
      },
      notes: {
        userId,
        plan
      }
    }
  } catch (error) {
    console.log("Razor pay error")
  }
}

export const verifyRazorpaySignature = async ({
  userId,
  orderId,
  paymentId,
  plan,
  signature
}: {
  userId: string,
  orderId: string,
  paymentId: string,
  plan: PlanType,
  signature: string
}) => {
  try {
    if (!RAZORPAY_KEY) {
      throw new Error("Error feetching razorpay key");
    }

    const body = orderId + "|" + "paymentId";
    const expectedSignature = crypto.createHmac("SHA256", RAZORPAY_KEY)
      .update(body.toString())
      .digest("hex")


    const isValid = expectedSignature == signature;
    console.log("Signature", { isValid })

    const order = await razorpay.orders.fetch(orderId)
    const amount = order.amount;

    const previousTransaction = await prisma.transaction.findFirst({
      where: {
        userId: userId,
        paymentId: paymentId,
        status: "PENDING"
      }
    })

    if (!previousTransaction) {
      throw new Error("No previous transaction found")
    }

    await prisma.transaction.update({
      where: {
        id: previousTransaction.id
      }, data: {
        status: isValid ? "SUCCESS" : "FAILED"
      }
    })

    return isValid
  } catch (error) {
    console.log("Verification failed")
    throw error;
  }
};

export async function addCredits(
  userId: string,
  plan: PlanType
) {
  try {

    const credits = CREDITS_PER_PLAN[plan];
    return await withRetry(() =>
      prisma.userCredit.upsert({
        where: {
          userId: userId
        },
        update: {
          amount: { increment: credits }
        },
        create: {
          userId,
          amount: credits
        }
      })
    )
  } catch (error) {
    console.log("Error while adding credits")
    throw error
  }
}

export async function getPacks(
  userId: string,
  paymentId: string,
  plan: PlanType,
  orderId: string,
  isAnnual: boolean = false
) {
  try {

    return await withRetry(() =>
      prisma.$transaction(async (client) => {
        console.log("Generating the packs", {
          userId,
          paymentId,
          plan,
          orderId
        })

        const subscription = await client.subscription.create({
          data: {
            userId,
            plan,
            paymentId,
            orderId
          }
        })

        await addCredits(userId, plan)
        return subscription;
      })
    )
  } catch (error) {
    console.log("Error while creating error");
    throw error
  }
}
