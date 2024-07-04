function time(timeu) {
    if (timeu == null){
        return 'NaN'
    }else{
    let unix_timestamp = timeu;
    var date = new Date(unix_timestamp * 1000);
    var day = date.getDay();
    var month = date.getMonth();
    var hours = date.getHours();
    if (hours == '00') {
        hours = '23'
    } else {
        hours--
    }
    var minutes = "0" + date.getMinutes();
    var formattedTime = day+ '.' + (month+1) + '  ' + hours + ':' + minutes.substr(-2);
    return formattedTime
}
}
function timet(timeut) {
    if (timeut == null){
        return 'NaN'
    }else{
    let unix_timestamp = timeut;
    var date = new Date(unix_timestamp * 1000);
    var day = date.getDay();
    var month = date.getMonth();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = day+ '.' + (month+1) + '  ' + hours + ':' + minutes.substr(-2);
    return formattedTime
}
}

function run() {

    // Creating Our XMLHttpRequest object 
    let xhr = new XMLHttpRequest();

    // Making our connection  
    let url = 'https://api.flightradar24.com/common/v1/airport.json?code=kuf&plugin[]=&plugin-setting[schedule][mode]=arrivals&page=1&limit=100&fleet=&token=';
    xhr.open("GET", url, true);

    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const user = this.responseText
            //const serializedUser = JSON.stringify(user);
            //const tomUser = JSON.parse(serializedUser);
            //console.log(tomUser["result"]);
            var data = this.responseText
            var person = JSON.parse(data);
            console.log(Object.keys(person.result.response.airport.pluginData.schedule.arrivals.data).length);

            let i = 0;
            let n = 0
            var arrData = '{'
            while (i < Object.keys(person.result.response.airport.pluginData.schedule.arrivals.data).length) { // выводит 0, затем 1, затем 2
                if (person.result.response.airport.pluginData.schedule.arrivals.data[i].flight.airport.origin.position.country.code != 'RU') {
                    console.log(person.result.response.airport.pluginData.schedule.arrivals.data[i].flight.airport.origin.position.region.city);
                    arrData += '"' + n + '":{"num":"' + person.result.response.airport.pluginData.schedule.arrivals.data[i].flight.identification.number.default + '",' +
                    '"country":"' + person.result.response.airport.pluginData.schedule.arrivals.data[i].flight.airport.origin.position.region.city + '",' +
                    '"time_sc_dep":"' + time(person.result.response.airport.pluginData.schedule.arrivals.data[i].flight.time.scheduled.departure) + '",' +
                    '"time_r_dep":"' + time(person.result.response.airport.pluginData.schedule.arrivals.data[i].flight.time.real.departure) + '",' +
                    '"time_sc_arr":"' + timet(person.result.response.airport.pluginData.schedule.arrivals.data[i].flight.time.scheduled.arrival) + '",' +
                    '"time_r_arr":"' + timet(person.result.response.airport.pluginData.schedule.arrivals.data[i].flight.time.estimated.arrival) + '"},'
                    n++;
                }
                i++;
            }
            arrData += '"00":{"":"00"}}'
            console.log(arrData)

            var arrDataJson = JSON.parse(arrData);
            console.log(n)
            var l = 0
            while (l < n) {
                var table = document.getElementById("arr-table"),
                    tbody = table.getElementsByTagName("tbody")[0];

                    var row = document.createElement("tr");
                    var cell1 = document.createElement("td");
                    var cell2 = document.createElement("td");
                    var cell3 = document.createElement("td");
                    var cell4 = document.createElement("td");
                    var cell5 = document.createElement("td");
                    var cell6 = document.createElement("td");
                    cell1.innerHTML = arrDataJson[l].num;
                    cell2.innerHTML = arrDataJson[l].country;
                    cell5.innerHTML = arrDataJson[l].time_sc_dep;
                    cell6.innerHTML = arrDataJson[l].time_r_dep;
                    cell3.innerHTML = arrDataJson[l].time_sc_arr;
                    cell4.innerHTML = arrDataJson[l].time_r_arr;
                    row.appendChild(cell1);
                    row.appendChild(cell2);
                    row.appendChild(cell3);
                    row.appendChild(cell4);
                    row.appendChild(cell5);
                    row.appendChild(cell6);
                    tbody.appendChild(row);
                l++;
            }
        }
    }
    // Sending our request 
    xhr.send()
}
run();