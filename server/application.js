

Meteor.startup(function () {

});


Twit = new TwitMaker({
  consumer_key:         Meteor.settings.twitter.consumerKey,
  consumer_secret:      Meteor.settings.twitter.consumerSecret,
  access_token:         Meteor.settings.twitter.accessToken,
  access_token_secret:  Meteor.settings.twitter.accessTokenSecret,
});

var tweet = function(){

	Twit.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
	  console.log(data)
	})
  
}

//var postToTwitter = function()

var queryMeetup = function(){

	var meetupBaseUrl = "https://api.meetup.com"
	var meetupKey = Meteor.settings.meetupKey
	var queryString = "state=ohio&city=dayton&topic_id=34"
	var url = meetupBaseUrl + "/2/concierge?"+queryString+"&key=" + meetupKey

	HTTP.call("GET", url,
          function ( error, result ) {

          	
          	for( i=0; i<result.data.results.length; i++ ){
          		var eventObj = result.data.results[i]
          		console.log( "Meetup object event id: " + eventObj.id )
          		console.log( "Status of event: " + eventObj.status)
          	}


          });	


}

var world = function () {
  console.log('World!');
}

var myBirthDay = function () {
  console.log('My Birth Day!');
}

var cron = new Meteor.Cron( {
  events:{
    "* * * * *"  : queryMeetup,
    "0 0 18 6 *" : myBirthDay
  }
});  




