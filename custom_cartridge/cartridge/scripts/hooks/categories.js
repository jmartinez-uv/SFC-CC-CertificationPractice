importPackage( dw.system );

exports.beforeGET = function(category,doc)
{
   return new Status(Status.ERROR);
}

exports.modifyGETResponse = function(category,doc)
{
    return new Status(Status.OK);
}