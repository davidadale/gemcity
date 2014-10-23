if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

/*  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    },

    fooSetting:function(){
      return Meteor.settings.key
    }

  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });*/

  Template.techEvents.helpers({
    techEvents: function(){

      Event = function(doc){
        _.extend( this, doc );
      }

      Event.prototype = {
        constructor: Event,
        showTime:function(){
          return moment( this.time ).format("MM/DD/YYYY hh:mm a")
        },
        howLong:function(){
          return moment.duration( this.duration ).humanize()
        }
      }

      return Events.find({},{transform:function(doc){ return new Event(doc) } })

    }
  })


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
