
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
                    <iframe width="400" height="300" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                `
    }