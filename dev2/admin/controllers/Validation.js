function Validation() {
    this.checkEmpty = function(valInput, msgErr, spanID) {
        if (valInput.trim() == "") {
            //!không hợp lệ
            document.getElementById(spanID).innerHTML = msgErr;
            return false;
        }
        //hợp lê
        document.getElementById(spanID).innerHTML = "";
        return true
    }
   
    this.checkDropdown = function (selectID,msgErr, spanID) {
        var index =document.getElementById(selectID).selectedIndex;
        if (index == 0) {
            document.getElementById(spanID).innerHTML = msgErr;
            return false;
        }
            document.getElementById(spanID).innerHTML = "";
            return true
        }
        
    }