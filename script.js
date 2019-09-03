window.onload = function() {
    document.getElementsByTagName("table")[0].style.visibility = "hidden"
}
function implementClass() {
    if(document.getElementById("errorMessage")) {
        document.getElementById("errorMessage").style.display = "none"
    }
    var textfield = document.getElementById("textfield")
    var classes = textfield.value.split('\n');
    for(i=0; i<classes.length; i++) {
        var attributes = classes[i].trim().replace(/\s+/g,' ').split(' ')

        // This line is invalid; probably blank
        if(attributes.length < 8) {
            continue;
        }

        // Shift it one over in the case of "GYM"
        if(attributes[3].toUpperCase() == "GYM") {
            attributes.splice(3, 1);
            attributes[2] += " GYM";
        }

        // Teachers might have a space, so fix that
        if(isNaN(attributes[attributes.length-3])) {
            attributes[attributes.length-2] = attributes[attributes.length-3] + " " + attributes[attributes.length-2];
            attributes.splice(attributes.length-3, 1);
        }

        // attributes = [days, period, classroom, class_id, name..., section, teacher, date?]

        var days = attributes[0].split(",")
        for(var j=0;j<days.length;j++) {
            var classElem = document.getElementById("p" + attributes[1] + days[j]);
            if(classElem) {
                var className = attributes.slice(4, -3).join(" ");
                classElem.innerHTML = [
                    className,
                    attributes[attributes.length-2], // teacher
                    attributes[2] // classroom
                ].join("<br>");
            }
        }
    }
    for(i=0;i<document.getElementsByTagName("TD").length;i++) {
        if(document.getElementsByTagName("TD")[i].innerHTML == "") {
            document.getElementsByTagName("TD")[i].innerHTML = "Free"
        }
    }
    document.getElementById("lunch").innerHTML = "Lunch"
    var letterDays = ["A","B","C","D","E","F","G","H"]
    for(m=0;m<letterDays.length;m++) {
        document.getElementsByTagName("TH")[m].innerHTML = letterDays[m]
    }
    var header = document.getElementsByClassName("pHeader")
    for(i=0;i<header.length;i++) {
        header[i].style.display = "none"
    }
    var sHeader = document.getElementsByClassName("sHeader")
    for(i=0;i<sHeader.length;i++) {
        sHeader[i].style.display = "block"
    }
    document.getElementsByTagName("table")[0].style.visibility = "visible"
    textfield.value = null
    var errorInSchedule = checkForErrors()
    if(errorInSchedule) {
        document.getElementsByTagName("table")[0].style.visibility = "hidden"
        var header = document.getElementsByClassName("pHeader")
        for(i=0;i<header.length;i++) {
            header[i].style.display = "block"
        }
        var sHeader = document.getElementsByClassName("sHeader")
        for(i=0;i<sHeader.length;i++) {
            sHeader[i].style.display = "none"
        }
        if(document.getElementById("errorMessage")) {
            document.getElementById("errorMessage").style.display = "block"
        } else {
            var errorHeading = document.createElement("h3")
            errorHeading.setAttribute("style", "color:red")
            errorHeading.setAttribute("id", "errorMessage")
            errorHeading.innerHTML = "Your schedule did not generate properly. Please try copying your schedule as instructed"
            document.getElementById("errorPlacement").appendChild(errorHeading)
        }
    }
}
function checkForErrors() {
    return false;
    var errorInSchedule = true
    for(i=0;i<document.getElementsByTagName("TD").length;i++) {
        if(!document.getElementsByTagName("TD")[i].innerHTML.includes("Free") && document.getElementsByTagName("TD")[i].innerHTML != "Lunch") {
            errorInSchedule = false
        }
    }
    for(i=0;i<document.getElementsByTagName("TD").length;i++) {
        if(document.getElementsByTagName("TD")[i].innerHTML.includes("undefined")) {
            errorInSchedule = true
        }
    }
    return errorInSchedule
}
