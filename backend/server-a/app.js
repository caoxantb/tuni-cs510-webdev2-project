import express from "express";
import "express-async-errors";

import { errorHandler } from "./utils/middleware";

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.use(errorHandler);

export default app;
