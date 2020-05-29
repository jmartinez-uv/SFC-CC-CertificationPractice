'use strict';

var server = require('server');
//var wallet = require('dw/customer/Wallet');
var File = require('dw/io/File');
var FileReader = require('dw/io/FileReader');
var XMLStreamReader = require('dw/io/XMLStreamReader');
var XMLStreamConstants = require('dw/io/XMLStreamConstants');
var job =  require('dw/job/JobStepExecution');

var file  = new File("IMPEX/src/order/customerpayment.xml");

//START_ELEMENT END_ELEMENT .text
function readFile() {
    var fileReader = new FileReader(file, "UTF-8");
    var xmlStreamReader = new XMLStreamReader(fileReader);
    var object = [];
    while (xmlStreamReader.hasNext()){
      if (xmlStreamReader.next() == XMLStreamConstants.START_ELEMENT){
        var localElementName = xmlStreamReader.getLocalName();
        object.push(localElementName);
        /*if (localElementName == "customers"){
        // read single "myobject" as XML
            var object = xmlStreamReader.getXMLObject();
        // process myObject
        }*/
      }
    }

  xmlStreamReader.close();
  fileReader.close();
  return object;
}

server.post('create', server.middleware.https ,function (readFile, req, res, next) {
  var CustomerMgr = require('dw/customer/CustomerMgr');
  //var map = request.getHttpParameterMap();
  var xmlStreamReader2 = new XML(readFile);//map.getRequestBodyAsString());
  var customerNo = xmlStreamReader2.children().attribute('customer-no');
  var customerXML = xmlStreamReader2.children().children().children().children();
  var cardType = xmlStreamReader2.children().children().children().children().child('card-type').toString();
  var headXML = customerXML.child('card-type').toString();
  var customer = CustomerMgr.getCustomerByCustomerNumber(customerNo);
  var cardNo = customerXML.child('card-number').toString();
  var expYear = customerXML.child('ending-year').toString();
  var expMonth = customerXML.child('ending-month').toString();
//  var newPaymentInstrument = Wallet.cratePaymentInstrument();
  var Transaction = require('dw/system/Transaction');

  Transaction.wrap(function () {
    var paymentInstrument = CustomerMgr.getCustomerByCustomerNumber(customerNo).getProfile().getWallet().createPaymentInstrument(cardType);
    paymentInstrument.setCreditCardNumber(cardNo);
    paymentInstrument.setCreditCardType(cardType);
    paymentInstrument.setCreditCardExpirationMonth(expMonth);
    paymentInstrument.setCreditCardExpirationYear(expYear);
  });
  res.json({
      "paymentInstrument": headXML.toString()
  });
  return next();
});

module.exports = server.exports();
