//these are global variables
var headline = $('.headline');
var image = $('img.answerimage');
var info = $('.info');
var problem = $('.problem');
var iframe = $('iframe');
var note = $('.note');
var love = $('.love');
var sectionId;
var e;

function clearResponse() {
    note.empty();
    love.empty();
  	headline.empty();
  	image.hide();
  	info.empty();
    iframe.hide();
};

//listen for selection from list
$('select').change(function () {
  	e = document.getElementById('problem');
  	sectionId = e.options[e.selectedIndex].value;

    //DAD1, make the kimono callback
    $.ajax({
        "url":"http://www.kimonolabs.com/api/2zaya4fk?apikey=cbe65feeda5bc52b81c5377c06ed1214&callback=katespadeCallback",
        "crossDomain":true,
        "dataType":"jsonp"
    });

  	//DAD2, make guardian callback
  	$.ajax({
  	  "url":"http://beta.content.guardianapis.com/search?api-key=ks6ga75baurqmfuq7echzcjp&page-size=20&show-fields=all&section=" + sectionId,
  	  "dataType":"json",
  	  "success": guardianCallback,
  	});

    //DAD3, make youtube callback
    $.ajax({
      "url":"http://www.kimonolabs.com/api/6ti9otx2?apikey=7f4c88fffa327672ae96daa2b3cfbd90&callback=youtubeCallback",
       "crossDomain":true,
       "dataType":"jsonp"
    });
});

function showReply(e){
  $('h2').hide();
  $('.reply').show();
}

//DAD1, get a random purse
function katespadeCallback(purses) {
		$('.dad1').on('click', function(e){
			showReply(e);
      //pick a random purse
			var number = Math.floor(Math.random(0,133)*132+1);
			//get the purse's picture
			var pursePicture = purses.results.collection1[number].image.src;
			var itemTitle = purses.results.collection1[number].name.text.toUpperCase();
      var pursePrice = purses.results.collection1[number].price;

      clearResponse();
  		//print new answer
  		image.attr('src', pursePicture).show();
  		info.html('Take ' + pursePrice +' from the emergency fund and get yourself this little ' + itemTitle  + '.'); 
  		love.html('Cheryl said these were very trendy. - Dad')
	  });
};


//DAD2 get guardian news
function guardianCallback(news){
	$('.dad2').on('click', function(e){
	  showReply(e);	
		var any = Math.floor(Math.random(0,20)*20+1);
		//pick the image
		var guardianImage = news.response.results[any].fields.thumbnail;
		//if a certain section ID, then a certain message

    function showImageInfo(){
			headline.html(news.response.results[any].webTitle);
			image.attr('src', guardianImage).show();
			info.html(news.response.results[any].fields.trailText);
    }

		clearResponse();

    switch (sectionId) {
      case 'money':
        note.html("Sweetheart, there are many ways to be rich.");
        showImageInfo();
        love.html("You're rich of spirit! Love, Dad");
        break;
		  case 'fashion':
        note.html("Human relationships are doomed to failure. Keep trying! I'll send you cash for something pretty.");
        showImageInfo();
        love.html('I married your mother out of spite. xoxo, Dad');
        break;
      case 'technology':
        note.html("We're all cyborgs anyway - why not marry a computer?");
        showImageInfo();
        love.html('Ha-ha. Just kidding. Marry a human. xoxo, Dad');
        break;
		  case 'science':
        note.html("No one knows what they're doing.");
        showImageInfo();
        love.html('Sometimes I wish I had been a marine. Oh well! <3 Dad');
        break;
		  case 'world':
        note.html("Do you think these people are worried about how they look?");
        showImageInfo();
        love.html('Beauty is an illusion, anyway. Kisses, Dad');
        break;
		  case 'travel':
        note.html("Well, you know your mother. We're having a great time, by the way.");
        showImageInfo();
        love.html('See you soon! love, Dad');
        break;
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
  var start = link.search("v=") + 2;
  var end = link.search("&list");
  var link_id = link.slice(start, end);

  $('.dad3').on('click', function(e){
    showReply(e); 
    clearResponse();
    //print new answer
    info.html('Honey, have you heard of The You Tube? You should listen to "' + song + '" by ' + artist + '. I\'ve heard it\'s really trending these days.');

    iframe.show();
    iframe.attr('src', '//www.youtube.com/embed/' + link_id);
  });
};

