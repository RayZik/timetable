import { Router, Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";


import { adminApi } from "./admin";
import { teacher } from "./teacher";
import { subject } from "./subject";


const admin: Router = Router();

admin.use("/", adminApi);
admin.use("/teacher", teacher);
admin.use("/subject", subject);

export { admin }





