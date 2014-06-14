var headline = $('.headline');
var image = $('img.answerimage');
var info = $('.info');
var problem = $('.problem');
var dad2=$('.dad2');
var note = $('.note');
var love = $('.love');

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
			var pursePrice = purses.results.collection1[number].price;
			console.log(purses.results.collection1[number].name.text);

			headline.empty();
			image.empty();
			info.empty();

			image.attr('src', pursePicture);
			info.html('Take ' + pursePrice +' from the emergency fund and get yourself this little ' + itemTitle  + ' ditty. On me.')
			love.html('Cheryl said these were very trendy. - Dad')
		});
	};

	$.ajax({
		"url":"http://www.kimonolabs.com/api/2zaya4fk?apikey=cbe65feeda5bc52b81c5377c06ed1214&callback=kimonoCallback",
		"crossDomain":true,
		"dataType":"jsonp"
		});

$('select').change(function () {
	var e = document.getElementById('problem');
	var sectionId = e.options[e.selectedIndex].value;
	console.log(sectionId);

	function guardianCallback(news){
			var any = Math.floor(Math.random(0,20)*20+1);

			//pick the image
			var guardianImage = news.response.results[any].fields.thumbnail;

			// clear fields
			function clearAll(){
			headline.empty();
			image.empty();
			info.empty();
		};
			//if a certain section ID, then a certain message
			 if (sectionId === 'money'){
				dad2.on('click', function(e){
					clearAll();
					note.html("Sweetheart, there are many ways to be rich. i.e. ");
					headline.html(news.response.results[any].webTitle);
					image.attr('src', guardianImage);
					info.html(news.response.results[any].fields.trailText+'.');
					love.html("You're rich of spirit! Love, Dad");
				});

			} else if (sectionId === 'fashion') {
				dad2.on('click', function(e){
					clearAll();
					note.html("Human relationships are doomed to failure. Keep trying! I'll send you cash for something pretty.");
					headline.html(news.response.results[any].webTitle);
					image.attr('src', guardianImage);
					info.html(news.response.results[any].fields.trailText+'.');
					love.html('I married your mother out of spite. xoxo, Dad');
				});
			} else if (sectionId === 'technology'){
				dad2.on('click', function(e){
					clearAll();
					note.html("We're all cyborgs anyway - why not marry a computer?");
					headline.html(news.response.results[any].webTitle);
					image.attr('src', guardianImage);
					info.html(news.response.results[any].fields.trailText+'.');
					love.html('Ha-ha. Just kidding. Marry a human. xoxo, Dad');
				});
			} else if (sectionId === 'science'){
				dad2.on('click', function(e){
					clearAll();
					note.html("No one knows what they're doing.");
					headline.html(news.response.results[any].webTitle);
					image.attr('src', guardianImage);
					info.html(news.response.results[any].fields.trailText+'.');
					love.html('Sometimes I wish I had been a marine. Oh well! <3 Dad');
				});
			} else if (sectionId === 'world') {
				dad2.on('click', function(e){
					clearAll();
					note.html("Do you think these people are worried about how they look?");
					headline.html(news.response.results[any].webTitle);
					image.attr('src', guardianImage);
					info.html(news.response.results[any].fields.trailText+'.');
					love.html('Beauty is an illusion, anyway. Kisses, Dad');
				});
			} else if (sectionId === 'travel'){
				dad2.on('click', function(e){
					clearAll();
					note.html("Well, you know your mother. We're having a great time, by the way.");
					headline.html(news.response.results[any].webTitle);
					image.attr('src', guardianImage);
					info.html(news.response.results[any].fields.trailText+'.');
					love.html('See you soon! love, Dad');
				});
			}

	};

	$.ajax({
	    "url":"http://beta.content.guardianapis.com/search?api-key=ks6ga75baurqmfuq7echzcjp&page-size=20&show-fields=all&section=" + sectionId,
	    "dataType":"json",
	    "success": guardianCallback
	});



//dad2 on click return API from vimeo call with keyword concatenated

$('.dad3').on('click', function(){
	// dadApp.vimeoCallback();
	console.log('dad3');
});

}); // on change brackets





