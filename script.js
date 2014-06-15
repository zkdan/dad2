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
			var any = Math.floor(Math.random(0,133)*132+1);
			//get the purse's picture
			var pursePicture = purses.results.collection1[any].image.src;
			var itemTitle = purses.results.collection1[any].name.text.toUpperCase();
      var pursePrice = purses.results.collection1[any].price;

      clearResponse();

      switch (sectionId) {
        case 'rent':
          info.html('You\'re paying for the neighborhood, honey! And you must fit in. Get this purse. It\'s only ' + pursePrice + ' and what a great name it has!! ' + itemTitle  + '.'); 
          break;
        case 'boyfriend':
          info.html('I\'ve always told you, guys like a girl who knows how to dress. Treat yourself to a ,' + itemTitle + ' hummm? Love is certainly worth more than this purse, which is just ' + pursePrice + '!!!!'); 
          break;
        case 'girlfriend':
          info.html('Ohh.. I really don\'t know what lesbians like in other lesbians. How about a purse? This one looks... feminine? Masculine? Ahhh I don\'t know! But I love you, honey.' + itemTitle + pursePrice + '.'); 
          break;
        case 'life':
          info.html('I remember when I was an intern at Merryl Lynch as a teenager and feeling the same way. Don\'t worry, you\'ll figure it out. And if you don\'t, well... you will. Here\'s something to hold all of life\'s things:' + itemTitle + pursePrice + '.'); 
          break;
        case 'body':
          info.html('But you\'re so beautiful! HOney you can make ANYTHINg look great. Even this snazzy bag. Why don\'t you buy it? I\'ll transfer you money!' + itemTitle + pursePrice); 
          break;
        case 'mom':
          info.html('Oh, your mother. You know I always saw myself with someone more like Anna Wintour. She would wear a purse like this, and she would SCOFF at the price!!!' + itemTitle + pursePrice); 
          break;
      };
  		
      //print rest of answer
  		image.attr('src', pursePicture).show();
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
      case 'rent':
        note.html("Sweetheart, there are many ways to be rich.");
        showImageInfo();
        love.html("You're rich of spirit! Love, Dad");
        break;
		  case 'boyfriend':
        note.html("Human relationships are doomed to failure. Keep trying! I'll send you cash for something pretty.");
        showImageInfo();
        love.html('I married your mother out of spite. xoxo, Dad');
        break;
      case 'girlfriend':
        note.html("We're all cyborgs anyway - why not marry a computer?");
        showImageInfo();
        love.html('Ha-ha. Just kidding. Marry a human. xoxo, Dad');
        break;
		  case 'life':
        note.html("No one knows what they're doing.");
        showImageInfo();
        love.html('Sometimes I wish I had been a marine. Oh well! <3 Dad');
        break;
		  case 'body':
        note.html("Do you think these people are worried about how they look?");
        showImageInfo();
        love.html('Beauty is an illusion, anyway. Kisses, Dad');
        break;
		  case 'mom':
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

    switch (sectionId) {
      case 'rent':
        note.html("When I was in a band, when could NEVER make our rent! Instead we listened to songs like " + song + " by " + artist + ". In our day, of course.");
        break;
		  case 'boyfriend':
        note.html("Honey, I\'m gonna let you work this one out with a song. Have you heard of The You Tube? " + song + " by " + artist + " seems like it could help you right now...");
        break;
      case 'girlfriend':
        note.html("I too experimented as a young adult. Hey, have you heard of The You Tube? It's a place where artists (and comedians!?) share their work. Maybe listen to " + song + " by " + artist + ". I listened to it before sending it to you!! Hope you like!");
        break;
		  case 'life':
        note.html("Hey, have you heard of The You Tube? It's a place where artists (and comedians!?) share their work. Maybe listen to " + song + " by " + artist + ". I listened to it before sending it to you!! Hope you like! And don\'t worry... it\'ll be fine. Just look at the Beatles!!!");
        break;
		  case 'body':
        note.html("YOU ARE WAY MORE NEAUTIFUL THAN THE PEOPLE IN THIS MUSIC VIDEO I FOUND ON THE YOU TUBE!! It\'s by " + artist + " and called " + song + ". I love you.");
        break;
		  case 'mom':
        note.html("Ugh, not now, honey. Have a song." + song + " by " + artist + ".");
        break;
		};

    //print new answer
    iframe.show();
    iframe.attr('src', '//www.youtube.com/embed/' + link_id);
  });
};

