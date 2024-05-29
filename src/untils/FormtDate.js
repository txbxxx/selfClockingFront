export function  timestampToTime (time) {
    if(time){
        var date = new Date(time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    }else{
        return ''
    }
}
export function  timestampToDay (time) {
    if(time){
        var date = new Date(time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '年';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '月' : date.getMonth() + 1 + '月';
        let D = date.getDate() < 10 ? '0' + date.getDate() + '日' : date.getDate() + '日';
        const w =date.getDay();
        const weekObj={
            1:'星期一',
            2:'星期二',
            3:'星期三',
            4:'星期四',
            5:'星期五',
            6:'星期六',
            0:'星期日',
        }
        return Y + M + D +weekObj[w];
    }else{
        return ''
    }
}
export function  timestampToMonth (time) {
    if(time){
        var date = new Date(time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '年';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '月' : date.getMonth() + 1 + '月';
        return Y + M ;
    }else{
        return ''
    }
}
