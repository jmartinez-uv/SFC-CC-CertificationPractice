const Status = require('dw./system/Status');
const Calendar = require('dw/util/Calendar');
const StringUtils = require('dw/utils/stringUtils');

function beforePatchCustomer(customer, customerInput){
    if(costumerInput.birthday==null){
        response.setStatus(400);
        return new Status(Status.ERROR, 'birthday is require');
    }
    return new Status(Status.OK);
}

exports.beforePatch = beforePatchCustomer;