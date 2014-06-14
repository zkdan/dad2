//this makes a global variable
var headline = $('.headline');
var image = $('img.answerimage');
var info = $('.info');
var problem = $('.problem');
var iframe = $('iframe');
var note = $('.note');
var love = $('.love');
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
  	console.log(sectionId + " is the sectionId");

  	//DAD2, make guardian callback
  	$.ajax({
  	  "url":"http://beta.content.guardianapis.com/search?api-key=ks6ga75baurqmfuq7echzcjp&page-size=20&show-fields=all&section=" + sectionId,
  	  "dataType":"json",
  	  "success": guardianCallback,
  	});
});

//DAD1, get a random purse
function katespadeCallback(purses) {
		$('.dad1').on('click', function(e){
			e.preventDefault();
			//pick a random purse
			var number = Math.floor(Math.random(0,133)*132+1);
			//get the purse's picture
			var pursePicture = purses.results.collection1[number].image.src;
			var itemTitle = purses.results.collection1[number].name.text.toUpperCase();
      var pursePrice = purses.results.collection1[number].price;

      clearAnswer();
  		//print new answer
  		image.attr('src', pursePicture);
  		info.html('Take ' + pursePrice +' from the emergency fund and get yourself this little ' + itemTitle  + ' ditty. On me.')
  		love.html('Cheryl said these were very trendy. - Dad')
	  });
};

//DAD1, make the kimono callback
$.ajax({
		"url":"http://www.kimonolabs.com/api/2zaya4fk?apikey=cbe65feeda5bc52b81c5377c06ed1214&callback=katespadeCallback",
		"crossDomain":true,
		"dataType":"jsonp"
});

//DAD2 get guardian news
function guardianCallback(news){
	$('.dad2').on('click', function(e){
		e.preventDefault();
		var any = Math.floor(Math.random(0,20)*20+1);
		//pick the image
		console.log(news);
		var guardianImage = news.response.results[any].fields.thumbnail;
		//if a certain section ID, then a certain message
		clearAnswer();
		if (sectionId === 'money'){
			note.html("Sweetheart, there are many ways to be rich. i.e. ");
			headline.html(news.response.results[any].webTitle);
			image.attr('src', guardianImage);
			info.html(news.response.results[any].fields.trailText+'.');
			love.html("You're rich of spirit! Love, Dad");
		} else if (sectionId === 'fashion'){
			note.html("Human relationships are doomed to failure. Keep trying! I'll send you cash for something pretty.");
			headline.html(news.response.results[any].webTitle);
			image.attr('src', guardianImage);
			info.html(news.response.results[any].fields.trailText+'.');
			love.html('I married your mother out of spite. xoxo, Dad');
		} else if (sectionId === 'technology'){
			note.html("We're all cyborgs anyway - why not marry a computer?");
			headline.html(news.response.results[any].webTitle);
			image.attr('src', guardianImage);
			info.html(news.response.results[any].fields.trailText+'.');
			love.html('Ha-ha. Just kidding. Marry a human. xoxo, Dad');
		} else if (sectionId === 'science'){
			note.html("No one knows what they're doing.");
			headline.html(news.response.results[any].webTitle);
			image.attr('src', guardianImage);
			info.html(news.response.results[any].fields.trailText+'.');
			love.html('Sometimes I wish I had been a marine. Oh well! <3 Dad');
		} else if (sectionId === 'world') {
			note.html("Do you think these people are worried about how they look?");
			headline.html(news.response.results[any].webTitle);
			image.attr('src', guardianImage);
			info.html(news.response.results[any].fields.trailText+'.');
			love.html('Beauty is an illusion, anyway. Kisses, Dad');
		} else if (sectionId === 'travel'){
			note.html("Well, you know your mother. We're having a great time, by the way.");
			headline.html(news.response.results[any].webTitle);
			image.attr('src', guardianImage);
			info.html(news.response.results[any].fields.trailText+'.');
			love.html('See you soon! love, Dad');
		};
	});
};


//DAD3 get youtube
function youtubeCallback(videos){
  var any = Math.floor(Math.random(0,1)*90+1);
  var video = videos.results.collection1[any];
  var artist = video.artist.text;
  var song = video["song title"].text;
  var link = video.artist.href;

  $('.dad3').on('click', function(e){
    e.preventDefault();

    clearAnswer();

    //print new answer
    info.html('You should listen to ' + song + ' by ' + artist + '. I\'ve heard it\'s really trending these days. ' + link);
    iframe.src = link;
  });
};

//DAD3, make youtube callback
$.ajax({
  "url":"http://www.kimonolabs.com/api/6ti9otx2?apikey=7f4c88fffa327672ae96daa2b3cfbd90&callback=youtubeCallback",
   "crossDomain":true,
   "dataType":"jsonp"
});
