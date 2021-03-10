import dayjs from 'dayjs'
import Vue from 'vue'

Vue.filter('date', function (val, type = "YYYY-MM-DD HH:mm:ss") {
    // console.log(type);
    return dayjs(val).format(type)
})