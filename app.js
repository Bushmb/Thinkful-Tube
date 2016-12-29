function getDataFromApi(searchTerm, numResults, callback) {
	url = 'https://www.googleapis.com/youtube/v3/search';
	var query = {
		part: 'snippet',
		key: 'AIzaSyDd2YiG5SZRDx96i1rzeX-VSUUYbBvu0Lg',
		q: searchTerm,
		maxResults: numResults

	};

	$.getJSON(url, query, callback);
}

function displayResults(query) {
	var resultElement = '';
	var entries = query.items;
	var totalResults = query.pageInfo.totalResults;

	if(totalResults >= 1000000) {
		$('.result-count').html('<h2>There were more than ' + commaSeparateNumber(totalResults) + ' Total Results based on your search</h2>');
	}
	else {
		$('.result-count').html('<h2>There were ' + commaSeparateNumber(totalResults)+ ' Total Results based on your search</h2>');
	}


	$.each(entries, function (index, value) {
		var title = value.snippet.title;
		var thumbnail = value.snippet.thumbnails.default.url;
		var videoSrc = value.id.videoId;

		resultElement += '<article class="vid-result">';
		resultElement += '<h2>' + (index+1) + '- ' + title + '</h2>';
		resultElement += '<iframe class="video" width="640" height="360" src="https://www.youtube.com/embed/'+videoSrc+'" frameborder="0" allowfullscreen></iframe>';
		resultElement += '</article>'
	});
  
  	$('.js-search-results').html(resultElement);
}



function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }

function watchSubmit() {
	$('.js-search-form').submit(function(e) {
		e.preventDefault();
		var searchTerm = $('.js-query').val();
		var resultsPerPage = $('#resultsPerPage').val();
		getDataFromApi(searchTerm, resultsPerPage, displayResults);
		
	});
}

$(function(){
	watchSubmit();
});
