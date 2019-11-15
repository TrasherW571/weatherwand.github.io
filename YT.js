
    var YTkey = 'AIzaSyDkaJ7oNGZzi6iRI5-D4d1efXIk7Gp-z8w';
    var YTURL = '//www.googleapis.com/youtube/v3/search';


    var options = {
        part: 'snippet',
        maxResults: 2,
			  q: document.getElementById("Search-Bar").value,
				key: YTkey
    }

    loadVids();

    function loadVids() {
        $.getJSON(YTURL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
						console.log('here');
						console.log(data);
            mainVid(id);
            //resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('.video-results').html(`
					<iframe width="400" height="300" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }