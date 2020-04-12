import moment from "moment";

function formatDate(date) {
    return moment(date).calendar(null, {
        lastDay: "[Yesterday at] LT",
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        lastWeek: "[last] dddd [at] LT",
        nextWeek: "dddd [at] LT",
        sameElse: "LLL"
    });
}

export { formatDate };