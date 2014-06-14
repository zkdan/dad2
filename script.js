var headline = $('.headline');
var image = $('img.answerimage');
var info = $('.info');
var problem = $('.problem');

$('select').change(function () {
	var e = document.getElementById('problem');
	var sectionId = e.options[e.selectedIndex].value;
	console.log(sectionId);

	function guardianCallback(news){
		$('.dad2').on('click', function(e){
			console.log(sectionId);
			e.preventDefault();		
			//pick any story 
			var any = Math.floor(Math.random(0,20)*20+1);
			//pick the image
			var guardianImage = news.response.results[any].fields.thumbnail;
			console.log(news.response.results[any]);

			//print this new info
			headline.html(news.response.results[any].webTitle);
			image.attr('src', guardianImage);
			info.html('The gist of this article is ' + news.response.results[any].fields.trailText + "or something.");
		});
	};

	$.ajax({
	    "url":"http://beta.content.guardianapis.com/search?api-key=ks6ga75baurqmfuq7echzcjp&page-size=20&section=" + sectionId + "&show-fields=all",
	    "dataType":"json",
	    "success": guardianCallback
	});

	function kimonoCallback(purses) {
		//ask dad 1, get a random purse
		$('.dad1').on('click', function(e){
			e.preventDefault();
			console.log('kimonocall');
			//pick a random purse
			var number = Math.floor(Math.random(0,133)*132+1);
			//get the purse's picture
			var pursePicture = purses.results.collection1[number].image.src;
			var itemTitle = purses.results.collection1[number].name.text.toUpperCase();
			console.log(purses.results.collection1[number].name.text);

			image.attr('src', pursePicture);
			headline.html(purses.results.collection1[number].price);
			info.html('Go get yourself this little ' + itemTitle  + ' ditty. On me.')
		});
	};

	$.ajax({
		"url":"http://www.kimonolabs.com/api/2zaya4fk?apikey=cbe65feeda5bc52b81c5377c06ed1214&callback=kimonoCallback",
		"crossDomain":true,
		"dataType":"jsonp"
		});



$('.dad3').on('click', function(){
	// dadApp.vimeoCallback();
	console.log('dad3');
});

}); // on change brackets

//dad2 on click return API from vimeo call with keyword concatenated

//dad3 on click return API from call with keyword concatenated




