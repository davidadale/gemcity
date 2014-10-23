

Meteor.startup(function () {

    return Meteor.methods({
      removeAllEvents: function() {
        return Events.remove({});
      }
    });  

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
/*
  Date using moment

  console.log( moment(1414099800000).format("MM-DD-YYYY hh:mm"))  

*/
//var postToTwitter = function()

var queryMeetup = function(){

	var meetupBaseUrl = "https://api.meetup.com"
	var meetupKey = Meteor.settings.meetupKey
	var queryString = "state=ohio&city=dayton&category_id=34"
	var url = meetupBaseUrl + "/2/concierge?"+queryString+"&key=" + meetupKey
  
	HTTP.call("GET", url,

          function ( error, result ) {

          	
          	for( i=0; i<result.data.results.length; i++ ){
          		
              var eventObj = result.data.results[i]

              var newEvent = {eventId:eventObj.id, description:eventObj.description,
                url:eventObj.event_url, duration:eventObj.duration,
                title:eventObj.name, time: eventObj.time,
                syndicated:false }

              if( typeof eventObj.venue != "undefined" ){
                newEvent.address = {name:eventObj.venue.name,state:eventObj.venue.state,
                  addressLine1:eventObj.venue.address_1,
                  city:eventObj.venue.city}
              }

              var existing = Events.findOne({eventId:newEvent.eventId })
              if( typeof existing == "undefined"){
                Events.insert( newEvent )  
              }

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




