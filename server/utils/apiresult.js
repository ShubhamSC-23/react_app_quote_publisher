
function apiResult (status, data, message){
    return {status, data, message};
}

function apiSuccess (data){
    return {status: "success", data: data};
}

function apiError (message){
    return {status: "error", message: message};
}


module.exports ={
    apiResult,
    apiSuccess,
    apiError
}