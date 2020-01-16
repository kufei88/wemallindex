import dateUtil from './date';
function formatDay(day){
  return day<10?'0'+day:day;
}
export default{
  getUrlKey: function(name){
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g,'%20'))||null
  },
  validateMobile:function(mobile){
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return myreg.test(mobile);
  },
  formatDate :function(date, format) {
    // date = toDate(date);
    // if (!date) return '';
     return dateUtil.format(date, format || 'yyyy-MM-dd');
 },

 getMonthBeginDay:function(){
     let now = new Date();

     return now.getFullYear() +'-'+ formatDay(now.getMonth()+1)+'-'+'01';
 },
 getToday:function(){
  let now = new Date();

  return now.getFullYear() +'-'+ formatDay(now.getMonth()+1)+'-'+formatDay(now.getDate());
},

}
