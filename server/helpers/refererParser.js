
function getNextUrl(referer, defaultUrl){
    var params = referer.split(';');
    for(var i=1; i<params.length; i++){
        if(params[i]){
            var param = params[i].split('=');
            if(param[0]=='next' && param[1])
                return param[1];
        }
    }
    return defaultUrl;
}

module.exports = {
    getNextUrl: getNextUrl
}
