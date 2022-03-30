const { DateTime, Interval } = require("luxon");
export const addDays = (date: Date, days: number): Date => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const getDiff = (d1: Date, d2: Date): number => {
    var result = d1.getTime() - d2.getTime();
    return result;
};

export const getDiffLuxon = (d1: any, d2: any): number => {
    const result = d1.toSeconds() - d2.toSeconds();
    return result;
};

export const getDiffInDays = (d1: Date, d2: Date): number => {
    var result = d1.getTime() - d2.getTime();
    return Math.ceil(result / (1000 * 60 * 60 * 24));
};

export const getDiffInDaysLuxon = (d1: any, d2: any): number => {
    const result = d1.toSeconds() - d2.toSeconds();
    return Math.ceil(result / (60 * 60 * 24));
};

export const daysMatch = (d1: Date, d2: Date): boolean => {
    return d1.getDate() == d2.getDate() &&
        d1.getMonth() == d2.getMonth() &&
        d1.getFullYear() == d2.getFullYear()
}

export const daysMatchLuxon = (d1: any, d2: any): boolean => {
    return d1.day == d2.day &&
        d1.month == d2.month &&
        d1.year == d2.year
}

export const twoDigitPad = (num: number): string => {
    return num < 10 ? ("0" + String(num)) : String(num);
}

export const formatDate = (date: any, patternStr: string): string => {
    var monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    var dayOfWeekNames = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    if (!patternStr) {
        patternStr = 'M/d/yyyy';
    }
    var day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        miliseconds = date.getMilliseconds(),
        h = hour % 12,
        hh = twoDigitPad(h),
        HH = twoDigitPad(hour),
        mm = twoDigitPad(minute),
        ss = twoDigitPad(second),
        aaa = hour < 12 ? 'AM' : 'PM',
        EEEE = dayOfWeekNames[date.getDay()],
        EEE = EEEE.substring(0, 3),
        dd = twoDigitPad(day),
        M = month + 1,
        MM = twoDigitPad(M),
        MMMM = monthNames[month],
        MMM = MMMM.substring(0, 3),
        yyyy = year + "",
        yy = yyyy.substring(2, 2);
    // checks to see if month name will be used
    if (patternStr.indexOf('MMM') <= -1) {
        patternStr = patternStr
            .replace('MM', MM)
            .replace('M', String(M));
    }

    patternStr = patternStr
        .replace('hh', hh).replace('h', String(h))
        .replace('HH', HH).replace('H', String(hour))
        .replace('mm', mm).replace('m', String(minute))
        .replace('ss', ss).replace('s', String(second))
        .replace('S', String(miliseconds))
        .replace('dd', dd).replace('d', String(day))

        .replace('EEEE', EEEE).replace('EEE', EEE)
        .replace('yyyy', yyyy)
        .replace('yy', yy)
        .replace('aaa', aaa);

    if (patternStr.indexOf('MMM') > -1) {
        patternStr = patternStr
            .replace('MMMM', MMMM)
            .replace('MMM', MMM);
    }

    return patternStr;
}

export const enumerateDaysBetweenDates = (
    startDate: Date,
    endDate: Date
): Date[] => {
    var dates: Date[] = [];

    var currDate: Date;
    let lastDate: Date;

    currDate = startDate;
    lastDate = endDate;

    currDate.setHours(0, 0, 0, 0);
    lastDate.setHours(0, 0, 0, 0);

    dates.push(currDate);

    var diff = getDiff(currDate, lastDate);

    var testDate = currDate;
    if (diff < 0) {
        while (getDiff(testDate, lastDate) < 0) {
            testDate = addDays(testDate, 1);
            dates.push(testDate);
        }
    }

    return dates;
};

export const enumerateDaysBetweenDatesLuxon = (
    startDate: any,
    endDate: any
): any[] => {
    var dates: any[] = [];

    var currDate: any;
    let lastDate: any;

    currDate = startDate.set({hour: 0, minutes: 0, seconds: 0});
    lastDate = endDate.set({hour: 0, minutes: 0, seconds: 0});

    dates.push(currDate);

    var diff = getDiffLuxon(currDate, lastDate);

    var testDate = currDate;
    if (diff < 0) {
        while (getDiffLuxon(testDate, lastDate) < 0) {
            //testDate = addDays(testDate, 1);
            testDate = testDate.plus({ days: 1 });
            dates.push(testDate);
        }
    }

    return dates;
};

export const enumerateStringDaysBetweenDates = (
    startDate: Date,
    endDate: Date
): string[] => {
    var dates: string[] = [];

    var currDate: Date;
    let lastDate: Date;

    currDate = startDate;
    lastDate = endDate;

    currDate.setHours(0, 0, 0, 0);
    lastDate.setHours(0, 0, 0, 0);

    dates.push(formatDate(currDate, 'dd-MM-yyyy'));

    var diff = getDiff(currDate, lastDate);

    var testDate = currDate;
    if (diff < 0) {
        while (getDiff(testDate, lastDate) < 0) {
            testDate = addDays(testDate, 1);
            dates.push(formatDate(testDate, 'dd-MM-yyyy'));
        }
    }

    dates.push(formatDate(lastDate, 'dd-MM-yyyy'));

    return dates;
};

export const checkIfWeekendDay = (date: Date): boolean => {
    var isWeekend = false;
    var dayOfWeek = date.getDay();
    isWeekend = (dayOfWeek === 6) || (dayOfWeek === 0);
    return isWeekend;
};

export const checkIfWeekendDayLuxon = (date: any): boolean => {
    var isWeekend = false;
    var dayOfWeek = date.weekday - 1;
    isWeekend = (dayOfWeek === 6) || (dayOfWeek === 0);
    return isWeekend;
};

export const deepCopy = (objectToBeCloned: any) => {
    let resultObj, value, key

    if (typeof objectToBeCloned !== "object" || objectToBeCloned === null) {
        return objectToBeCloned
    }

    if (typeof objectToBeCloned === "object") {
        if (objectToBeCloned.constructor.name !== "Object") {
            resultObj = new objectToBeCloned.constructor(objectToBeCloned)
        } else {
            resultObj = Array.isArray(objectToBeCloned) ? [] : {}
        }
    }

    for (key in objectToBeCloned) {
        value = objectToBeCloned[key]

        // Recursively copy for nested objects & arrays
        resultObj[key] = deepCopy(value)
    }

    return resultObj
}