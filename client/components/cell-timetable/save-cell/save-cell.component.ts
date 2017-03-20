import { Component, OnInit, Input } from '@angular/core';
import moment from 'moment';

@Component({
    selector: 'tt-save-cell',
    templateUrl: "client/components/cell-timetable/save-cell/save-cell.component.html",
    styleUrls: ['client/components/cell-timetable/save-cell/save-cell.component.css']
})

export class SaveCellComponent implements OnInit {

    private configSave: Object = {};

    constructor() {

    };

    ngOnInit() {

    }

    repeatCheck(checkRepeat, repeatModal) {
        if (checkRepeat.checked) {
            repeatModal.show({ blurring: false, closable: false });
        }
    }

    closeRepModal(repeatModal, checkRepeat) {
        repeatModal.hide();
        checkRepeat.checked = false;
        this.configSave = {};
    }

    saveCell(config) {
        console.log(config);
    }
    show(config) {
        console.log(config);
    }

    // saveOneWeek(cell, dayIndex, timeListBegin, timeListEnd): void {
    // 	let result = {};
    // 	let begin = moment(this.dateList[dayIndex].day).second(timeListBegin);
    // 	let end = moment(this.dateList[dayIndex].day).second(timeListEnd);

    // 	if (this.contains(cell.time, begin.toISOString()) === undefined) {
    // 		cell.time = { begin: begin.toDate(), end: end.toDate() };
    // 		result = { id: cell._id, time: cell.time };
    // 	}

    // 	if (result != {}) {
    // 		this.adminService
    // 			.saveOneWeek(result)
    // 			.subscribe();
    // 	}
    // }

    // saveToEnd(cell, dayIndex, timeListBegin, timeListEnd): void {
    // 	let result: Object = {};
    // 	let arrTime = [];
    // 	let firstDayWeek = moment(this.dateList[0].day).utc();
    // 	let lastDate = moment(this.data.endDate).utc();
    // 	let diff = Math.ceil(lastDate.diff(firstDayWeek, 'days') / 7);

    // 	let begin = moment(this.dateList[dayIndex].day).second(timeListBegin);
    // 	let end = moment(this.dateList[dayIndex].day).second(timeListEnd);

    // 	for (let e = 0; e < diff; e++) {
    // 		begin = moment(this.dateList[dayIndex].day).add(e * 7, 'day').second(timeListBegin);
    // 		end = moment(this.dateList[dayIndex].day).add(e * 7, 'day').second(timeListEnd);

    // 		if (this.contains(cell.time, begin.toISOString()) === undefined) {
    // 			arrTime.push({ begin: begin.toDate(), end: end.toDate() });
    // 		}
    // 	}
    // 	result = { id: cell._id, time: arrTime };
    // 	if (arrTime.length > 0) {
    // 		this.adminService
    // 			.saveToEnd(result)
    // 			.subscribe();
    // 	}
    // }
}

