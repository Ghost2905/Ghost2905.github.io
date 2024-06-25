var request = new XMLHttpRequest();
request.open("GET", "https://kuf.aero/board/", true);  // last parameter must be true
request.responseType = "document";
request.onload = function (e) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      var a = request.responseXML.querySelector("div.result:nth-child(1) > div:nth-child(1) > h2:nth-child(1) > a:nth-child(1)");
      console.log(a.href);
      document.body.appendChild(a);
    } else {
      console.error(request.status, request.statusText);
    }
  }
};
request.onerror = function (e) {
  console.error(request.status, request.statusText);
};
request.send(null);  // not a POST request, so don't send extra data