Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.leaderboard.players = function () {
    return Players.find({}, {sort: {pos: 1}});
  };

  Template.leaderboard.rendered = function () {
    var el = document.getElementById('players');
    new Sortable(el, {
        // group: "name",
        // store: null, // @see Store
        // handle: ".my-handle", // Restricts sort start click/touch to the specified element
        // filter: ".ignor-elements", // Selectors that do not lead to dragging (String or Function)
        draggable: ".item",   // Specifies which items inside the element should be sortable
        // ghostClass: "sortable-ghost",

        onStart: function (evt) { 
          // start dragging
        },
        onEnd: function (evt) { 
          var items = $("#players")[0].children;
          for (var i = items.length - 1; i >= 0; i--) {
            Players.update({_id: items[i].id}, {$set: {pos: $(items[i]).index() }});
          };          
        }
    });
  };

}


if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = ["Ada Lovelace",
                   "Grace Hopper",
                   "Marie Curie",
                   "Carl Friedrich Gauss",
                   "Nikola Tesla",
                   "Claude Shannon",
                   "Sir Isaac Newton",
                   "Galileo",
                   "Albert Einstein",
                   "Charles Darwin"
                   ];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], pos: [i]});
    }
  });
}
