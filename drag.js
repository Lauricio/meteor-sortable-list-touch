Players = new Meteor.Collection("players");
Groups = new Meteor.Collection("groups");

if (Meteor.isClient) {


  Template.myContent.helpers({
    groups: function () {
      return Groups.find({}, {sort: {sortOrderPosition: 1}});
    }  });

  Template.group.helpers({
    items: function () {
      return Players.find({group: this._id}, {sort: {sortOrderPosition: 1}});
    }
  });

//
//      Sortable Group list
//

  // Settings and helpers

  // DOM: groupWrapper > group > groupItemsWrapper > items
  var groupWrapper;
  var groupWrapperId = "#groupWrapper";
  var groupItemsWrapperClass = "js-sortGroupItems";
  var groupClass = ".js-sortGroup";
  var groupHandle = ".js-sortGroupHandle";
  var groupName = "myGroup"; // Used to connect rendered groups.
  var itemsCollection = Players;
  var groupCollection = Groups;

  function sortGroupItems() {
    [].forEach.call(groupWrapper.getElementsByClassName(groupItemsWrapperClass), function (el){
      var items = $(el)[0].children;
      for (var i = items.length - 1; i >= 0; i--) {
        itemsCollection.update({_id: items[i].id}, {$set: {sortOrderPosition: $(items[i]).index() + 1, group: $(items[i]).closest(groupClass).attr('id') }});
      }
    });
  };

  function createSortableGroups(el) {
    new Sortable(el, {
      draggable: groupClass,
      handle: groupHandle,
      animation: 150,
      onEnd: function (evt) {
        var items = $(el)[0].children;
        for (var i = items.length - 1; i >= 0; i--) {
          groupCollection.update({_id: items[i].id}, {$set: {sortOrderPosition: $(items[i]).index() }});
        };
      }
    });
  }

  function createSortableItems(el) {
    var el = el[0];
    new Sortable(el, {
      group: groupName,
      animation: 150,
      onEnd: function (evt) {
        sortGroupItems();
      }
    });
  }

  // END: Settings and helpers


  Template.myContent.rendered = function () {
    groupWrapper = this.$(groupWrapperId)[0];
    createSortableGroups(groupWrapper);
  };

  Template.group.rendered = function () {
    createSortableItems(this.$('.' + groupItemsWrapperClass));
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
                   "Charles Darwin",
                   "Stephen Hawking",
                   "Johannes Kepler",
                   "Archimedes"
                   ];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], sortOrderPositionition: i + 1, group: "PkopJd5s6kHy8rwuX"});
    }

    if (Groups.find().count() === 0) {
        Groups.insert({name: "Platinum", sortOrderPositionition: 1, _id: "PkopJd5s6kHy8rwuX"});
        Groups.insert({name: "Gold", sortOrderPositionition: 2, _id: "4H9jcndvXgaiHdHd2"});
        Groups.insert({name: "Silver", sortOrderPositionition: 3, _id: "pgge34GQ48mxBYRdM"});
    }
  });
}
