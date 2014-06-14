var headline = $('.headline');
var image = $('img.answerimage');
var info = $('.info');
var problem = $('.problem');
var sectionId;
var e;

function clearAnswer() {
  headline.empty();
  image.empty();
  info.empty();
};

//listen for selection from list
$('select').change(function () {
	e = document.getElementById('problem');
	sectionId = e.options[e.selectedIndex].value;
	console.log(sectionId + " sectionId");
});

//DAD1, get a random purse
function kimonoCallback(purses) {
		$('.dad1').on('click', function(e){
			e.preventDefault();
			//pick a random purse
			var number = Math.floor(Math.random(0,133)*132+1);
			//get the purse's picture
			var pursePicture = purses.results.collection1[number].image.src;
			var itemTitle = purses.results.collection1[number].name.text.toUpperCase();

      clearAnswer();

      //print new answer
      image.attr('src', pursePicture);
			headline.html(purses.results.collection1[number].price);
			info.html('Go get yourself this little ' + itemTitle  + ' ditty. On me.')
		});
};

//DAD1, make the kimono callback
$.ajax({
		"url":"http://www.kimonolabs.com/api/2zaya4fk?apikey=cbe65feeda5bc52b81c5377c06ed1214&callback=kimonoCallback",
		"crossDomain":true,
		"dataType":"jsonp"
});

//DAD2 get guardian news
function guardianCallback(news){
  $('.dad2').on('click', function(e){
		e.preventDefault();
		//pick any story 
		var any = Math.floor(Math.random(0,20)*20+1);
		//pick the image
		console.log('image: ' + news.response);
		var guardianImage = news.response.results[any].fields.thumbnail;

    clearAnswer();

    //print new answer
    headline.html(news.response.results[any].webTitle);
		image.attr('src', guardianImage);
		info.html('The gist of this article is ' + news.response.results[any].fields.trailText + "or something.");
  });
};

//DAD2, make guardian callback
$.ajax({
  "url":"http://beta.content.guardianapis.com/search?api-key=ks6ga75baurqmfuq7echzcjp&page-size=20&show-fields=all&section=" + sectionId,
  "dataType":"json",
  "success": guardianCallback
});

//DAD3 get youtube
function youtubeCallback(videos){
  $('.dad3').on('click', function(e){
    e.preventDefault();
    //pick a song
    console.log('song: ');

    clearAnswer();

    //print new answer
    //
  });
};

//DAD3, make youtube callback
$.ajax({
  "url":"" + sectionId,
  "dataType":"json",
  "success": youtubeCallback
});
