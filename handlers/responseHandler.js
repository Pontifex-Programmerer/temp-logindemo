
function standardResponse(title, payload){
    return {title, payload};
}

function NotAuthorized() {
    return standardResponse('Not Authorized', {message:'Could not authorize user'})
}
module.exports={
    standardResponse,
    NotAuthorized
}