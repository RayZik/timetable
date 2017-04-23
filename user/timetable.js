let Gdata;
let configFilter = {
    date: {
        next: false,
        prev: false
    },
    subjectId: '',
    teacherId: '',
    groupId: '',
    officeId: ''
};
let dateList = [];
let bDay = moment.utc(moment().format('YYYY-MM-DD'));

$.ajax({
    url: "http://localhost:3000/api/user",
    type: "GET",
    dataType: "json",
    success: (data) => {
        Gdata = data;
        load(data);
    }
});

$.ajax({
    url: "http://localhost:3000/api/user/filter",
    type: "GET",
    dataType: "json",
    success: (data) => {
        createFilter(data);
    }
});


function load(data) {
    let cells = data.cells;
    appendTop(data);
    appendBody(data.timeLesson['0'].lessons, cells, dateList);
}

function appendTop(data) {
    let date = toValidWeek(bDay);
    let dayWeek = date.date();

    $('#table').append('<tr id="top"><td></td></tr>');
    for (let i = 0; i < 7; i++) {
        dateList.push({ day: date });
        date = moment(date.date(dayWeek + i));

        let body = '<td>' + getNameDay(moment(date.date(dayWeek + i)).day()) + ' / ' + date.date() + ', ' + (+date.month() + 1) + '</td>';
        $('#top').append(body);
    }
}

function appendBody(data, validate, dateList) {
    let timeList = [];
    let timeLess = data;

    for (let i = 0; i < timeLess.length; i++) {
        let countSlots = [];

        for (let a = 0; a < 7; a++) {
            countSlots.push([]);
        }

        timeLess[i].slots = countSlots;

        for (let j = 0; j < timeLess[i].slots.length; j++) {
            let begin = moment(dateList[j].day).second(timeLess[i].begin).toISOString();
            validate.forEach(cell => {
                cell.time.forEach(time => {
                    if (moment(time.begin).unix() === moment(begin).unix()) {
                        timeLess[i].slots[j].push(cell);
                    }
                });
            });
        }
        timeList.push(timeLess[i]);
    }

    pushDataInTable(timeList);
}

function pushDataInTable(timeList) {
    timeList.forEach((less, i) => {
        let idLess = 'less_' + i;

        $('#table').append('<tr id="' + idLess + '"><td>' + formatTimeLesson(less) + '</td></tr>');

        less.slots.forEach((slot, j) => {
            let idSlot = 'slot_i_' + i + '_j' + j;

            if (slot.length > 0) {
                $('#' + idLess).append('<td id="' + idSlot + '"></td>');
                slot.forEach((cell, j) => {
                    $('#' + idSlot).append('<div class="cell">' + tempCell(cell) + '</div>');
                });
            } else {
                $('#' + idLess).append('<td></td>');
            }
        })

    })
}

function formatTimeLesson(time) {
    let begin = moment(time.begin * 1000).format('hh:mm');
    let end = moment(time.end * 1000).format('hh:mm');
    return begin + ' - ' + end;
}

function getNameDay(num) {
    let arr = ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'];
    return arr[num];
}

function toValidWeek(bDay) {

    if (bDay.day() === 0) {
        bDay = bDay.add(-6, 'day');
        return bDay;
    }

    if (bDay.day() !== 1 && bDay.day() !== 0) {
        let diff = 1 - bDay.day();
        bDay = bDay.add(diff, 'day');
        return bDay;
    }
}

function prewWeek() {
    configFilter.date.prev = true;
    configFilter.date.next = false;

    change();
}

function nextWeek() {
    configFilter.date.prev = false;
    configFilter.date.next = true;

    change();
}

function change() {
    let res = {
        dateList: [],
        cells: []
    };

    $('#table').empty();
    if (configFilter.date.next || configFilter.date.prev) {
        let firstDayWeek = moment(dateList[0].day);
        let lastDayWeek = moment(dateList[6].day);
        $('#table').append('<tr id="top"><td></td></tr>');

        if (configFilter.date.next) {
            for (let i = 0; i < 7; i++) {
                let endDay = moment(lastDayWeek).day() + 1;
                let date = moment(lastDayWeek).day(endDay + i);
                res.dateList.push({ day: date });

                let body = '<td>' + getNameDay(moment(date).day()) + ' / ' + date.date() + ', ' + (+date.month() + 1) + '</td>';
                $('#top').append(body);
            }
            dateList = res.dateList;
            configFilter.date.next = false;
        }

        if (configFilter.date.prev) {
            for (let i = 6; i >= 0; i--) {
                let beginDay = moment(firstDayWeek).day() - 1;
                let date = moment(firstDayWeek).day(beginDay - i);
                res.dateList.push({ day: date });

                let body = '<td>' + getNameDay(moment(date).day()) + ' / ' + date.date() + ', ' + (+date.month() + 1) + '</td>';
                $('#top').append(body);
            }
            dateList = res.dateList;
            configFilter.date.prev = false;
        }

        Gdata.cells.forEach((cell) => {
            let timeCell = [];
            cell.time.forEach(time => {
                let isBef = moment(time.end).isBefore(moment(res.dateList[6].day).add(1, 'day'));
                let isAf = moment(time.begin).isAfter(res.dateList[0].day);

                if (isAf && isBef) {
                    timeCell.push(time);
                }
            });

            if (timeCell.length > 0) {
                cell.time.push(timeCell);
                res.cells.push(cell)
            }
        });

        res.cells = checkParams(res.cells);
        appendBody(Gdata.timeLesson['0'].lessons, res.cells, dateList);
    } else {

        $('#table').append('<tr id="top"><td></td></tr>');
        for (let i = 0; i < 7; i++) {
            let date = moment(dateList[i].day);
            let dayWeek = date.date();
            let body = '<td>' + getNameDay(date.day()) + ' / ' + date.date() + ', ' + (+date.month() + 1) + '</td>';
            $('#top').append(body);
        }

        Gdata.cells.forEach((cell) => {
            let timeCell = [];
            cell.time.forEach(time => {
                let isBef = moment(time.end).isBefore(moment(dateList[6].day).add(1, 'day'));
                let isAf = moment(time.begin).isAfter(dateList[0].day);

                if (isAf && isBef) {
                    timeCell.push(time);
                }
            });

            if (timeCell.length > 0) {
                cell.time.push(timeCell);
                res.cells.push(cell)
            }
        });

        res.cells = checkParams(res.cells);
        appendBody(Gdata.timeLesson['0'].lessons, res.cells, dateList);
    }
}

function checkParams(cells) {
    let result = [];
    if (cells.length > 0) {
        cells.forEach(cell => {
            let a = [];

            if (configFilter.groupId != '') {
                a.push(cell.group.some(group => {
                    return group._id === configFilter.groupId;
                }));
            }

            if (configFilter.officeId != '') {
                a.push(cell.office.some(office => {
                    return office._id === configFilter.officeId;
                }));
            }

            if (configFilter.subjectId != '') {
                a.push(cell.subject.some(subject => {
                    return subject._id === configFilter.subjectId;
                }));
            }

            if (configFilter.teacherId != '') {
                a.push(cell.teacher.some(teacher => {
                    return teacher._id === configFilter.teacherId;
                }));
            }

            if (contains(a, false) !== false) {
                result.push(cell);
            }
        });

        return result;
    }

    return result;
}

function createFilter(data) {
    $('#filter').append('<span id="prev" class="buttonFilter" onclick="prewWeek()">Назад</span>');
    if (data.subject.length > 0) {
        let subject = data.subject;
        $('#filter').append('<select id="selS" onchange="setSubjectFilter(this)"><option value="">Предмет</option></select>');

        subject.forEach((sub) => {
            $('#selS').append('<option onchange="setSubjectFilter(this)" value="' + sub._id + '">' + sub.name + '</option>');
        })
    }

    if (data.teacher.length > 0) {
        let teacher = data.teacher;
        $('#filter').append('<select id="selT" onchange="setTeacherFilter(this)"><option value="">Учитель</option></select>')

        teacher.forEach((tchr) => {
            $('#selT').append('<option onchange="setTeacherFilter(this)" value="' + tchr._id + '">' + tchr.surname + ' ' + tchr.name + ' ' + tchr.lastName + '</option>');
        })
    }

    if (data.group.length > 0) {
        let group = data.group;
        $('#filter').append(' <select id="selG" onchange="setGroupFilter(this)" ><option value="">Группа</option></select>')

        group.forEach((grp) => {
            $('#selG').append('<option onchange="setGroupFilter(this)" value="' + grp._id + '">' + grp.name + '</option>');
        })
    }

    if (data.office.length > 0) {
        let office = data.office;
        $('#filter').append('<select id="selO" onchange="setOfficeFilter(this)"><option value="">Кабинет</option></select>')

        office.forEach((ofc) => {
            $('#selO').append('<option onchange="setOfficeFilter(this)"" value="' + ofc._id + '">' + ofc.name + '</option>');
        })
    }

    $('#filter').append('<span id="next" class="buttonFilter" onclick="nextWeek()">Вперед</span>');
}

function setOfficeFilter(param) {
    configFilter.officeId = param.value;
    change();
}

function setGroupFilter(param) {
    configFilter.groupId = param.value;
    change();
}

function setTeacherFilter(param) {
    configFilter.teacherId = param.value;
    change();
}

function setSubjectFilter(param) {
    configFilter.subjectId = param.value;
    change();
}

function contains(arr, elem) {
    if (arr.length > 0) {
        return arr.find((bool) => bool === elem);
    } else {
        return -1;
    }
}

function tempCell(cell) {
    let group = 'Нет данных';
    let office = 'Нет данных';
    let subject = 'Нет данных';
    let teacher = 'Нет данных';
    let temlate = 'Нет данных';

    if (cell.group.length > 0) {
        cell.group.forEach((g, j) => {
            group = '<span>' + g.name + '</span>';
        });
    }

    if (cell.office.length > 0) {
        cell.office.forEach((o, j) => {
            office = '<span>' + o.name + '</span>';
        });
    }

    if (cell.subject.length > 0) {
        cell.subject.forEach((s, j) => {
            subject = '<span>' + s.name + '</span>';
        });
    }

    if (cell.teacher.length > 0) {
        cell.teacher.forEach((t, j) => {
            teacher = '<span>' + t.surname + ' ' + t.name[0] + '.' + t.lastName[0] + '.' + '</span>';
        });
    }

    return temlate =
        '<div>' + subject + '</div>' +
        '<div>' + teacher + '</div>' +
        '<div>' + group + '</div>' +
        '<div>' + office + '</div>'
}