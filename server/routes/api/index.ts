import { Router } from 'express';

import { adminApi } from './main';
import { cellTimetableApi } from './cellTimetable';
import { timetableApi } from './timetable';
import { teacher } from './teacher';
import { subject } from './subject';
import { office } from './office';
import { group } from './group';

const restApi: Router = Router();

restApi.use('/main', adminApi);
restApi.use('/main/timetable', timetableApi);
restApi.use('/main/cellTimetable', cellTimetableApi);
restApi.use('/main/teacher', teacher);
restApi.use('/main/subject', subject);
restApi.use('/main/office', office);
restApi.use('/main/group', group);

export { restApi }





