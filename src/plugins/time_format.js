/*
 * @author liyuelong1020@gmail.com
 * @date 2017/12/20
 * @description 获取时间字符串
 */

export default function (date, format) {
    if(!(date instanceof Date)) {
        date = new Date(date);
    }

    let week_name = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    let now = new Date();
    let now_year = now.getFullYear();

    let time_stamp = date.getTime();
    let year = date.getFullYear();
    let week = date.getDay();
    let hour = date.getHours();
    let min = date.getMinutes();

    now.setHours(hour, min, date.getSeconds(), date.getMilliseconds());

    if(hour < 10) {
        hour = '0' + hour;
    }

    if(min < 10) {
        min = '0' + min;
    }

    let time_str = hour + ':' + min;
    let diff_day = Math.floor((now - date ) / 86400000);


    if (diff_day === 0) {
        if(Date.now() - time_stamp < 3600000) {
            return Math.floor((Date.now() - time_stamp) / 60000) + '分钟前';
        } else if(Date.now() - time_stamp < 86400000) {
            return Math.floor((Date.now() - time_stamp) / 3600000) + '小时前';
        } else {
            return time_str;
        }
    } else if (diff_day === 1) {
        return '昨天 ' + time_str;
    } else if (diff_day < 7 && week > 0 &&  week < now.getDay()) {
        return week_name[week] + ' ' + time_str;
    } else if(year === now_year) {
        return (Number(date.getMonth()) + 1) + '月' + date.getDate() + '日 ' + time_str;
    } else {
        return now_year - year + '年前';
    }

}
