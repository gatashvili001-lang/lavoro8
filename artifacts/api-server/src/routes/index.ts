import { Router, type IRouter } from "express";
import healthRouter from "./health";
import jobsRouter from "./jobs";
import reviewsRouter from "./reviews";
import storageRouter from "./storage";
import stripeRouter from "./stripe";
import externalJobsRouter from "./external-jobs";
import contactRouter from "./contact";
import paddleRouter from "./paddle";
import stripeCheckoutRouter from "./stripe-checkout";
import applicationsRouter from "./applications";
import onlineRouter from "./online";
import seedBatch8Router from "./seed-batch8";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use(applicationsRouter);
router.use(jobsRouter);
router.use(reviewsRouter);
router.use(stripeRouter);
router.use(externalJobsRouter);
router.use(contactRouter);
router.use(paddleRouter);
router.use(stripeCheckoutRouter);
router.use(onlineRouter);
router.use(seedBatch8Router);

export default router;
