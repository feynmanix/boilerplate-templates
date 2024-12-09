import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.json({ status: "OK" });
});

export default router;
