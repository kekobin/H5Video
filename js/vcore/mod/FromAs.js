function getPayId() {
    var payStr = "";
    var date = new Date;
    var dateStr = numberFormat(date.getFullYear()) + numberFormat(date.getMonth() + 1) + numberFormat(date.getDate());
    var timeStr = numberFormat(date.getHours()) + numberFormat(date.getMinutes()) + numberFormat(date.getSeconds());
    var uid = createGUID([7]);
    payStr = dateStr + timeStr + "0005" + uid;
    return payStr.toUpperCase();
}

function createGUID(value) {
    var uid = new Array();
    var chars = new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70);
    var separator = 45;
    var template = value || new Array(8, 4, 4, 4, 12);

    for (var a = 0; a < template.length; a++) {
        for (var b = 0; b < template[a]; b++) {
            uid.push(chars[Math.floor(Math.random() * chars.length)]);
        }
        if (a < template.length - 1) {
            uid.push(separator);
        }
    }
    return String.fromCharCode.apply(null, uid);
}

function numberFormat(value) {
    if (value < 10) {
        return "0" + value.toString();
    } else {
        return value.toString();
    }
}
