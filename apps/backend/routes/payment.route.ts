import express from "express";
import { PlanType } from "@prisma/client";
import { PaymentService } from "../service/payment";
import { jwtMiddleWare } from "../middleware";
import { prisma } from "db";


export const router = express.Router();


router.post("/create", jwtMiddleWare, async (req: express.Request, res: express.Response) => {
  try {
    const { plan, isAnnual } = req.body;
    const userEmail = (req as any).user.email
    const userId = req.userId!;

    if (!userId) {
      res.status(400).json({
        message: "No user was found createe a new user"
      })
      return
    }

    if (!userEmail) {
      res.status(400).json({
        message: "No email was found"
      })
      return
    }
    if (!plan) {
      res.status(400).json({
        message: "No plan is selected kindly select the plan"
      })
      return
    }

    const order = await PaymentService.razorPayment(userId, plan)
    res.json(order)
    return;
  } catch (error) {
    console.log("Error while creating a razorpay payment");
    res.status(500).json({

      message: "Error while creating razor payment",
      details:
        Bun.env.NODE_ENV === "development" ? (error as Error).message : undefined
    })
  }
})


router.post("/payment/verify", jwtMiddleWare, async (req, res) => {
  try {
    const {
      razorpay_paymeent_id,
      razorpay_order_id,
      razorpay_signature,
      plan,
      isAnnual
    } = req.body;

    const userId = req.userId!;

    console.log("Payment verification", {
      razorpay_paymeent_id,
      razorpay_order_id,
      razorpay_signature,
      plan,
      isAnnual
    })
    if (!razorpay_paymeent_id || !razorpay_order_id || !razorpay_signature || !plan || !isAnnual) {
      res.status(400).json({
        message: "No payment details found"
      })
      return
    }

    const isValid = await PaymentService.verifyRazorpaySignature({
      userId: req.userId!,
      orderId: razorpay_order_id,
      paymentId: razorpay_paymeent_id,
      plan: plan as PlanType,
      signature: razorpay_signature
    })

    if (!isValid) {
      res.status(400).json({
        message: "Invalid payment details"
      })
      return
    }
    try {
      const subscription = await PaymentService.createSubscriptionRecord(
        userId,
        razorpay_paymeent_id,
        plan,
        razorpay_order_id,
        isAnnual
      )

      const credits = await prisma.userCredit.findUnique({
        where: {
          userId
        },
        select: {
          amount: true
        }
      })

      console.log("Payment verified successfully", {
        subscription,
        credits: credits?.amount ?? 0
      })

      res.json({
        message: "Payment verified successfully",
        subscription,
        credits: credits?.amount ?? 0
      })
    } catch (error) {
      console.log("Error while creating a subscription record")
      res.status(500).json({
        message: "Error while creating subscription record",
        details: Bun.env.NODE_ENV === "development" ? (error as Error).message : undefined
      })
    }

  } catch (error) {
    console.log("Error while verifying payment")
    res.status(500).json({
      message: "Error while verifying payment",
      details: Bun.env.NODE_ENV === "development" ? (error as Error).message : undefined
    })
  }
})


router.get("/subscription/:userId", jwtMiddleWare, async (req, res) => {
  try {
    const userId = req.userId!;
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        plan: true,
        createdAt: true
      }
    })
    res.json({
      subscription: subscription || null
    })
  } catch (error) {
    console.log("Error while getting subscription")
    res.status(500).json({
      message: "Error while getting subscription"
    })
  }
})


router.get("/credits/:userId", jwtMiddleWare, async (req, res) => {
  try {
    const userId = req.userId!;
    const credits = await prisma.userCredit.findUnique({
      where: {
        userId
      },
      select: {
        amount: true
      }
    })
    res.json({
      credits: credits?.amount ?? 0
    })
  } catch (error) {
    console.log("Error while getting credits")
    res.status(500).json({
      message: "Error while getting credits",
      details: Bun.env.NODE_ENV === "development"
        ? (error as Error).message
        : undefined
    })
  }
})


router.get("/credits", jwtMiddleWare, async (req: express.Request, res: express.Response) => {
  try {
    if (!req.userId) {
      res.status(400).json({
        message: "No user id found"
      })
      return
    }

    const credits = await prisma.userCredit.findUnique({
      where: {
        userId: req.userId
      }, select: {
        amount: true,
        updatedAt: true
      }
    })

    res.json({
      credits: credits?.amount ?? 0,
      updatedAt: credits?.updatedAt,
    })
    return
  } catch (error) {
    console.log("Error while getting credits")
    res.status(500).json({
      message: "Error while getting credits"
    })
    return
  }
})

router.get("/transactions", jwtMiddleWare, async (req: express.Request, res: express.Response) => {
  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        userId: req.userId!
      }, orderBy: {
        createdAt: "desc"
      }
    })
    res.json({
      transactions: transaction
    })
    return
  } catch (error) {
    console.log("Error while getting transactions")
    res.status(500).json({
      message: "Error while getting transactions"
    })
    return
  }
})