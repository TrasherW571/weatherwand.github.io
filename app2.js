// Global Variables
var spanId;
var numOfResults;
var resultCount;


// Loads our Client
function loadClient() {
  gapi.client.setApiKey("AIzaSyDeK-20S_t_t-Q8aO1815DVuATW1YHjEvA");
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest")
    .then(
      function() { 
        console.log("GAPI client loaded for API"); 
        executeSetUp(); 
        },
        function(err) { console.error("Error loading GAPI client for API", err); }
        );
}


// Make sure the client is loaded before calling this method.
function executeSetUp() {
  // Our Search Engine ID's
  var amazonCX = "012123320383898428184:hkj7q3zqvnn";
  var ebayCX = "012123320383898428184:rvjiwhzwqmm";
  var etsyCX = "012123320383898428184:hmfuaqhzbru";

  // getting value from searchbar
  var searchRequest = document.getElementById("Search-Bar").value;
  // console.log("Searched For: " + searchRequest);

  // checks for which sites are checked
  var checkAmazon = document.getElementById("Amazon-Box").checked;
  var checkEbay = document.getElementById("eBay-Box").checked;
  var checkEtsy = document.getElementById("Etsy-Box").checked;
  // console.log("Amazon value: " + checkAmazon);
  // console.log("eBay value: " + checkEbay);
  // console.log("Etsy value: " + checkEtsy);
  var selectAmazon_Ebay = checkAmazon && checkEbay;
  var selectAmazon_Etsy = checkAmazon && checkEtsy;
  var selectEbay_Etsy = checkEbay && checkEtsy;
  spanId = "s";

  // determines which set of requests we want to execute
  if (searchRequest == "") {
    alert("Please enter something into the search bar");
  }
  else if (checkAmazon && checkEbay && checkEtsy) {
    numOfResults = 3;
    executeRequest(amazonCX, spanId, searchRequest);
    executeRequest(ebayCX, spanId, searchRequest);
    executeRequest(etsyCX, spanId, searchRequest);
  }
  else if (selectAmazon_Ebay) {
    numOfResults = 5;
    executeRequest(amazonCX, spanId, searchRequest);
    executeRequest(ebayCX, spanId, searchRequest);
  }
  else if (selectAmazon_Etsy) {
    numOfResults = 5;
    executeRequest(amazonCX, spanId, searchRequest);
    executeRequest(etsyCX, spanId, searchRequest);
  }
  else if (selectEbay_Etsy) {
    numOfResults = 5;
    executeRequest(ebayCX, spanId, searchRequest);
    executeRequest(etsyCX, spanId, searchRequest);
  }
  else if (checkAmazon) {
    numOfResults = 10;
    executeRequest(amazonCX, spanId, searchRequest);
  }
  else if (checkEbay) {
    numOfResults = 10;
    executeRequest(ebayCX, spanId, searchRequest);
  }
  else if (checkEtsy) {
    numOfResults = 10;
    executeRequest(etsyCX, spanId, searchRequest);
  }
  else {
    alert("Please select a store filter option");
  }
}


// Calls the CSE API to search for our request
function executeRequest(cx, spanId, searchRequest) {
  var request = gapi.client.search.cse.list({
    "q": searchRequest,
    "cx": cx,
    "num": 10
  });
  request.execute(function(response) {
  // Handle the results here (response.result has the parsed body).
  // console.log("Response", response.result);
  var results = response.result;
  resultCount = 0;
  results.items.forEach(appendResultsToDocument);
  });
}


// Appends the results from the search to the HTML Document
function appendResultsToDocument(item, index) {
  // console.log("ResultCount: " + resultCount);
  // We don't want to append links to customer reviews
  if (item.htmlTitle.search("Customer reviews") == -1 && resultCount < numOfResults) {
    // console.log(index + ": " + item.title);
    spanId += '1';
    // console.log(spanId);
    var str = item.title;
    var strLink = str.link(item.link);
    document.getElementById("search-results").innerHTML += strLink;
    document.getElementById("search-results").innerHTML += "<br>";
    var node = document.createElement("SPAN");
    node.setAttribute("id", spanId);
    node.setAttribute("class", 'URL');
    document.getElementById("search-results").appendChild(node);
    document.getElementById(spanId).innerHTML += item.formattedUrl;
    document.getElementById("search-results").innerHTML += "<br>";
    document.getElementById("search-results").innerHTML += item.snippet;
    document.getElementById("search-results").innerHTML += "<br>";
    resultCount++;
  }
}

var YTkey = "AIzaSyCicnsvS9vq-YvKGPbmuKqPN_KnLyt91HI";
    var YTURL = "//www.googleapis.com/youtube/v3/search";


    var options = {
        part: "snippet",
        maxResults: 2,
                order: "relevance",
                type: "video",
              q: "",
                key: YTkey
    }

    function loadVids() {
                var checkAmazon = document.getElementById("Amazon-Box").checked;
                var checkEbay = document.getElementById("eBay-Box").checked;
                var checkEtsy = document.getElementById("Etsy-Box").checked;                    
            
                var search = document.getElementById("Search-Bar").value;
                options.q = search;
        $.getJSON(YTURL, options, function (data) {
                        console.log("here");
                        console.log(data);
                    if ((search.replace(/\s/g, '').length) && (checkAmazon || checkEbay || checkEtsy)){
                        data.items.forEach(addVid);
                    }
            
        });
    }

    function addVid(item, index) {
            var id = item.id.videoId;
            console.log(id);
            document.getElementById("video-results").innerHTML += `
                    <iframe width="400" height="225" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                `
    }

gapi.load("client");
