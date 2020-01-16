import { AjaxPlugin } from 'vux'
var HttpUtil = function(){};

HttpUtil.get = function(url, params, cb){

    AjaxPlugin.$http.get('api/'+url, {params:params})
    .then((response) => {
        if (cb) cb(response.data)
    })
}

HttpUtil.post = function(url, params, cb,ce){
    let dataStr = ''
    for (let key in params) {
        dataStr += key + '=' + params[key]+'&'
    }
    dataStr = dataStr.substr(0, dataStr.length - 1)

    AjaxPlugin.$http.post('api/'+url, dataStr)
    .then((response) => {
        if (cb) cb(response.data)
    },(error)=>{
      if(ce) ce(error)
    })
}

HttpUtil.del = function(url, params, cb){

      AjaxPlugin.$http.delete('api/'+url, {params:params})
      .then((response) => {
          if (cb) cb(response.data)
      })
  }

export default HttpUtil;
