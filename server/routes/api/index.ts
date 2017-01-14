import { Router, Response, Request, NextFunction } from "express";

import { homeApi } from "./home";

import { adminApi } from "./admin";
import { cellTimetableApi } from "./cellTimetable";
import { timetableApi } from "./timetable";
import { teacher } from "./teacher";
import { subject } from "./subject";
import { office } from "./office";
import { group } from "./group";

const restApi: Router = Router();

restApi.use("/home", homeApi)
restApi.use("/admin", adminApi);
restApi.use("/admin/timetable", timetableApi);
restApi.use("/admin/cellTimetable", cellTimetableApi);
restApi.use("/admin/teacher", teacher);
restApi.use("/admin/subject", subject);
restApi.use("/admin/office", office);
restApi.use("/admin/group", group);

export { restApi }





