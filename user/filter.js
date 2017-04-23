// let

function prewWeek() {
    console.log(Gdata)
}

function nextWeek() {

}

// function change() {
//     let res = {
//         dateList: [],
//         cells: []
//     };

//     if (this.configFilter.date.next || this.configFilter.date.prev) {
//         let firstDayWeek = moment(this.dateList[0].day);
//         let lastDayWeek = moment(this.dateList[6].day);

//         if (this.configFilter.date.next) {
//             for (let i = 0; i < 7; i++) {
//                 let endDay = moment(lastDayWeek).day() + 1;
//                 let date = moment(lastDayWeek).day(endDay + i);

//                 let cont = this.holidayList[0].date.find((elem) => date.isSame(moment(elem)));
//                 if (cont) {
//                     res.dateList.push({ day: date.toISOString(), isHoliday: true });
//                 } else {
//                     res.dateList.push({ day: date.toISOString(), isHoliday: false });
//                 }

//             }
//             this.configFilter.date.next = false;
//         }

//         if (this.configFilter.date.prev) {
//             for (let i = 6; i >= 0; i--) {
//                 let beginDay = moment(firstDayWeek).day() - 1;
//                 let date = moment(firstDayWeek).day(beginDay - i);
//                 let cont = this.holidayList[0].date.find((elem) => date.isSame(moment(elem)));
//                 if (cont) {
//                     res.dateList.push({ day: date.toISOString(), isHoliday: true });
//                 } else {
//                     res.dateList.push({ day: date.toISOString(), isHoliday: false });
//                 }
//             }
//             this.configFilter.date.prev = false;
//         }

//         this.cellWithTime.forEach((cell) => {
//             let timeCell = [];
//             cell.time.forEach(time => {
//                 let isBef = moment(time.end).isBefore(moment(res.dateList[6].day).add(1, 'day'));
//                 let isAf = moment(time.begin).isAfter(res.dateList[0].day);

//                 if (isAf && isBef) {
//                     timeCell.push(time);
//                 }
//             });

//             if (timeCell.length > 0) {
//                 cell.time.push(timeCell);
//                 res.cells.push(cell)
//             }
//         });


//         res.cells = this.checkParams(res.cells);
//         this.onChanged.emit(res);

//     } else {
//         res.cells = this.checkParams(this.cellWithTime);
//         this.onChanged.emit(res);
//     }
// }


// function checkParams(cells) {
//     let result = [];
//     // cells.forEach(cell => {
//     //     let a = [];

//     //     if (this.configFilter.group.length > 0) {
//     //         a.push(this.configFilter.group.some(cfGroup =>
//     //             cell.group.some(group => {
//     //                 return group._id === cfGroup._id;
//     //             })
//     //         ))
//     //     }

//     //     if (this.configFilter.office.length > 0) {
//     //         a.push(this.configFilter.office.some(cfOffice =>
//     //             cell.office.some(office => {
//     //                 return office._id === cfOffice._id;
//     //             })
//     //         ))
//     //     }

//     //     if (this.configFilter.subject.length > 0) {
//     //         a.push(this.configFilter.subject.some(cfSubject =>
//     //             cell.subject.some(subject => {
//     //                 return subject._id === cfSubject._id;
//     //             })
//     //         ))
//     //     }

//     //     if (this.configFilter.teacher.length > 0) {
//     //         a.push(this.configFilter.teacher.some(cfTeacher =>
//     //             cell.teacher.some(teacher => {
//     //                 return teacher._id === cfTeacher._id;
//     //             })
//     //         ));
//     //     }

//     //     if (this.contains(a, false) !== false) {
//     //         result.push(cell);
//     //     }
//     // });

//     return result;
// }

// function contains(arr, elem) {
//     if (arr.length > 0) {
//         return arr.find((bool) => bool === elem);
//     } else {
//         return -1;
//     }
// }