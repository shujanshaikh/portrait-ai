import { Router } from "express";

export const router = Router();

router.post("/payment", (req, res) => {
  res.json({
    message: "Payment successful"
  })
})


