var FNC = {};
FNC = (function() {

    function withoutArrayObjAND(arrayObj, withoutObj) {
        var length, newLength;
        do {
            length = arrayObj.length;
            arrayObj = _.without(
                arrayObj, 
                _.findWhere(
                    arrayObj, 
                    withoutObj
                )
            );
            newLength = arrayObj.length;
        } while(length !== newLength);
        return arrayObj;
    }
        
    function withoutArrayObjOR(arrayObj, withoutObj) {
        pairs = _.pairs(withoutObj);
        withoutArrayObj = [];
        for(var idx=0; idx < pairs.length; idx++) {
            withoutArrayObj[idx] = new Object();
            withoutArrayObj[idx][pairs[idx][0]] = pairs[idx][1];
        }
        for(idx = 0; idx < withoutArrayObj.length ; idx++) {
            arrayObj = withoutArrayObjAND(arrayObj, withoutArrayObj[idx]);
        }
        return arrayObj;
    }
    
    function sumArrayObjByKey(arrayObj, numKey) {
        return _.reduce(
                _.pluck(arrayObj, numKey),
                function(sum, num) {
                    return (+sum) + (+num);
                }
        );
    }
    
    function avgArrayObjByKey(arrayObj, numKey) {
        var sum, length;
        length = arrayObj.length;
        sum = sumArrayObjByKey(arrayObj, numKey);
        return sum/length;
    }
    
    return {
        withoutArrayObjAND : withoutArrayObjAND,
         withoutArrayObjOR : withoutArrayObjOR,
          sumArrayObjByKey : sumArrayObjByKey,
          avgArrayObjByKey : avgArrayObjByKey
    }
}());