import {
    differenceInDays,
    formatRelative,
    format
} from "date-fns"

function formatDate(value) {
    if (!value) {
        return "-"
    }
    
    const date = new Date(value);
    const baseDate = new Date();
    return Math.abs(differenceInDays(date, baseDate)) < 6 ?
        capitalizeFirst(formatRelative(date, baseDate)) :
        format(date, `PPp`);

    function capitalizeFirst(value) {
        return value[0].toUpperCase() + value.substr(1);
    }
}

function formatTrackingEvent(trackingEvent) {
    if (trackingEvent.code) {
        return trackingEvent.description ?
            `${trackingEvent.description} (${trackingEvent.code})` :
            trackingEvent.code.toString();
    } else {
        return "-";
    }
}

export {
    formatDate,
    formatTrackingEvent
};