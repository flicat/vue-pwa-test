/*!
 * @author liyuelong1020@gmail.com
 * @date 2017/12/20
 * @description 获取时间字符串
 */

export default function (date) {
    if(!(date instanceof Date)) {
        date = new Date(date);
    }

    let week_name = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    let now = new Date();
    let now_year = now.getFullYear();

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
        return time_str;
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
