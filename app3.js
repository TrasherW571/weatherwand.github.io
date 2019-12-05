// Global Variables
var spanId;
var numOfResults;
var resultCount;
var firstRequest;
var secondRequest;
var brandOneRequests;


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
  if (firstRequest == "") {
    alert("Please enter something into the search bar");
  }
  else if (checkAmazon && checkEbay && checkEtsy) {
    numOfResults = 3;
    executeRequest(amazonCX, spanId, firstRequest, secondRequest, 3);
    executeRequest(ebayCX, spanId, firstRequest, secondRequest, 3);
    executeRequest(etsyCX, spanId, firstRequest, secondRequest, 3);
    
    executeRequest(amazonCX, spanId, firstRequest, secondRequest, 3);
    executeRequest(ebayCX, spanId, firstRequest, secondRequest, 3);
    executeRequest(etsyCX, spanId, firstRequest, secondRequest, 3);
  }
  else if (selectAmazon_Ebay) {
    numOfResults = 5;
    executeRequest(amazonCX, spanId, firstRequest, secondRequest, 2);
    executeRequest(ebayCX, spanId, firstRequest, secondRequest, 2);
    
    executeRequest(amazonCX, spanId, firstRequest, secondRequest, 2);
    executeRequest(ebayCX, spanId, firstRequest, secondRequest, 2);
  }
  else if (selectAmazon_Etsy) {
    numOfResults = 5;
    executeRequest(amazonCX, spanId, firstRequest, secondRequest, 2);
    executeRequest(etsyCX, spanId, firstRequest, secondRequest, 2);
    
    executeRequest(amazonCX, spanId, firstRequest, secondRequest, 2);
    executeRequest(etsyCX, spanId, firstRequest, secondRequest, 2);
  }
  else if (selectEbay_Etsy) {
    numOfResults = 5;
    executeRequest(ebayCX, spanId, firstRequest, secondRequest, 2);
    executeRequest(etsyCX, spanId, firstRequest, secondRequest, 2);
    
    executeRequest(ebayCX, spanId, firstRequest, secondRequest, 2);
    executeRequest(etsyCX, spanId, firstRequest, secondRequest, 2);
  }
  else if (checkAmazon) {
    numOfResults = 10;
    executeRequest(amazonCX, spanId, firstRequest, secondRequest, 1);
    
    executeRequest(amazonCX, spanId, firstRequest, secondRequest, 1);
  }
  else if (checkEbay) {
    numOfResults = 10;
    executeRequest(ebayCX, spanId, firstRequest, secondRequest, 1);
    
    executeRequest(ebayCX, spanId, firstRequest, secondRequest, 1);
  }
  else if (checkEtsy) {
    numOfResults = 10;
    executeRequest(etsyCX, spanId, firstRequest, secondRequest, 1);
    
    executeRequest(etsyCX, spanId, firstRequest, secondRequest, 1);
  }
  else {
    alert("Please select a store filter option");
  }
}


// Calls the CSE API to search for our request
function executeRequest(cx, spanId, brandOne, brandTwo, brandRequests) {
  var searchRequest;
  if(brandOneRequests > brandRequests) {
    searchRequest = brandTwo;
  }
  else {
    searchRequest = brandOne;
  }
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
    document.getElementById("search-results").innerHTML += item.formattedUrl;
    document.getElementById("search-results").innerHTML += "<br>";
    document.getElementById("search-results").innerHTML += item.snippet;
    document.getElementById("search-results").innerHTML += "<br>";
    resultCount++;
  }
}

var YTkey = "AIzaSyDWrWZSoDKwoOd8sLxYTXI7L0_h-DwoVFQ";
var YTURL = "//www.googleapis.com/youtube/v3/search";


    var options = {
        part: "snippet",
        maxResults: 2,
                order: "relevance",
                type: "video",
              	q: "",
              	videoCategoryId: "26",
                key: YTkey
    }

    function loadVids() {
        var checkAmazon = document.getElementById("Amazon-Box").checked;
        var checkEbay = document.getElementById("eBay-Box").checked;
        var checkEtsy = document.getElementById("Etsy-Box").checked;

        //var search = document.getElementById("Search-Bar").value;
        var search = firstRequest;
        console.log("item to search on youtube: " + search);
        options.q = search;
        $.getJSON(YTURL, options, function (data) {
           console.log("here");
           console.log(data);
           if ((search) && (checkAmazon || checkEbay || checkEtsy)){
               data.items.forEach(addVid);
           }
        });
      
      search = secondRequest;
      console.log("item to search on youtube: " + search);
        options.q = search;
        $.getJSON(YTURL, options, function (data) {
           console.log("here");
           console.log(data);
           if ((search) && (checkAmazon || checkEbay || checkEtsy)){
               data.items.forEach(addVid);
           }
        });
    }

    function addVid(item, index) {
            var id = item.id.videoId;
            console.log(id);
            document.getElementById("video-results").innerHTML += `
                    <div class="video-container"><iframe width="400" height="225" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>
                `
    }

    const key = '33783ab49aa36c8ef3edfe2e994386a1';
    var cond;
    var cityInput = document.getElementsByName("textbox1").value;

    function weatherBallon(city) {
      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)
          .then(function (resp) { return resp.json() }) // Convert data to json
          .then(function (data) {
              //drawWeather(data);
              getItem(data);
            })
          .catch(function () {
              // catch any errors
            });
    }


    function drawWeather(d) {
      var celsius = Math.round(parseFloat(d.main.temp) - 273.15);
      var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
      var description = d.weather[0].description;
      cond = d.weather[0].id;
      var item;

      document.getElementById('description').innerHTML = description;
      document.getElementById('temp').innerHTML = fahrenheit + '°';
      document.getElementById('location').innerHTML = d.name;
      document.getElementById('condition').innerHTML = cond;
    }

    function getItem(d) {
      var condition = d.weather[0].id;
      console.log(condition); 
      var temperature = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
      console.log("temp = " + temperature);
      var currentTime = d.dt;
      var sunrise = d.sys.sunrise;
      var sunset = d.sys.sunset;
      var isDay = false;
      var isCold = false;
      var isFreezing = false;
      console.log("time = " + currentTime + ", sunrise = " + sunrise + ", sunset = " + sunset);
      
      if (currentTime >= sunrise && currentTime <= sunset){
        console.log("currently daytime");
        isDay = true;
      }
      
      if (temperature <= 32){
        isFreezing = true;
        console.log("it's currently under 32F: " + temperature);
      } else if (temperature <= 50){
        console.log("it's currently under 50: F" + temperature);
        isCold = true;
      } else{
        console.log("it's currently over 50F: " + temperature);
      }
      
      //clear sky
      if ((condition >= 800 && condition <= 802) && isDay && !isCold) {
        //document.getElementById('result').innerHTML = 'Prada Sunglasses';
        firstRequest = 'Prada Sunglasses';
        secondRequest = "Versace Sunglasses";
        loadVids();
        //rain
      } 
        else if ((condition >= 800 && condition <= 802) && !isDay && !isCold) {
        firstRequest = 'Streamlight Strion';
          secondRequest = "SureFire Flashlight";
        loadVids();
      }
        else if ((condition >= 800 && condition <= 802) && isCold) {
        firstRequest = 'North Face Sweatshirt';
        secondRequest = "Arc'Teryx Parka";  // change later
        loadVids();
      } else if ((condition >= 800 && condition <= 802) && isFreezing) {
        firstRequest = 'North Face Coat';
        secondRequest = "Arc'Teryx Parka";  // change later
        loadVids();
      } else if ((condition >= 200 && condition <= 202) || (condition >= 230 && condition <= 232) ||
        (condition >= 300 && condition <= 321) || (condition >= 500 && condition <= 531) || (condition >= 803 && condition <= 804)) {
        //document.getElementById('result').innerHTML = 'Betterbrella';
        firstRequest = 'Betterbrella';
        secondRequest = "WindJammer Umbrella";
        loadVids();
        //sleet
      } else if (condition == 611) {
        //document.getElementById('result').innerHTML = 'Security Chain Company ZT741';
        firstRequest = 'Security Chain Company ZT741';
        secondRequest = "Cobra Cable Passenger Chain";
        loadVids();
        //snow
      } else if (condition >= 600 && condition <= 602) {
        //document.getElementById('result').innerHTML = 'North Face Jacket';
        firstRequest = 'North Face Jacket';
        secondRequest = "Arc'Teryx Parka";
        loadVids();
        //rain and snow
      } else if (condition >= 612 && condition <= 622) {
        //document.getElementById('result').innerHTML = 'L.L. Bean Boots';
        firstRequest = 'L.L. Bean Boots';
        secondRequest = "Asgard Ankle Rain Boots";
        loadVids();
        //tornado/squall
      } else if ((condition >= 210 && condition <= 221) || condition == 771 || condition == 781) {
        //document.getElementById('result').innerHTML = 'Ready American Emergency Kit';
        firstRequest = 'Ready American Emergency Kit';
        secondRequest = "Stealth Angel Emergency Kit";
        loadVids();
        //fog/mist
      } else if (condition == 701 || condition == 741) {
        //document.getElementById('result').innerHTML = 'Streamlight Strion';
        firstRequest = 'Streamlight Strion';
        secondRequest = "SureFire Flashlight";
        loadVids();
        //sand/dust
      } else if (condition == 721 || condition == 751) {
        //document.getElementById('result').innerHTML = 'Global Industrial Goggles';
        firstRequest = 'Global Industrial Goggles';
        secondRequest = "3M Goggles";
        loadVids();
        //smoke/smog
      } else if (condition == 731 || condition == 751 || condition == 761 || condition == 762) {
        //document.getElementById('result').innerHTML = '3M Half Facepiece Respirator';
        firstRequest = '3M Half Facepiece Respirator';
        secondRequest = "Industrial Safety Respirators";
        loadVids();
        //unaccounted for
      } else {
        //document.getElementById('result').innerHTML = 'Unaccounted for condition';
        firstRequest = 'Unaccounted for condition';
        secondRequest = 'Unaccounted for condition';
        loadVids();
      }
    }


gapi.load("client");
