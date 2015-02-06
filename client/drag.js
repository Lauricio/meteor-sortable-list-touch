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

  // function sortGroupItems() {
  //   [].forEach.call(groupWrapper.getElementsByClassName(groupItemsWrapperClass), function (el){
  //     var items = $(el)[0].children;
  //     for (var i = items.length - 1; i >= 0; i--) {
  //       itemsCollection.update({_id: items[i].id}, {$set: {sortOrder: $(items[i]).index() + 1, group: $(items[i]).closest(groupClass).attr('id') }});
  //     }
  //   });
  // };

  // function createSortableGroups(el) {
  //   new Sortable(el, {
  //     draggable: groupClass,
  //     handle: groupHandle,
  //     animation: 150,
  //     onEnd: function (evt) {
  //       var items = $(el)[0].children;
  //       for (var i = items.length - 1; i >= 0; i--) {
  //         groupCollection.update({_id: items[i].id}, {$set: {sortOrder: $(items[i]).index() }});
  //       };
  //     }
  //   });
  // }

  // function createSortableItems(el) {
  //   var el = el[0];
  //   new Sortable(el, {
  //     group: groupName,
  //     animation: 150,
  //     onEnd: function (evt) {
  //       sortGroupItems();
  //     }
  //   });
  // }

  // END: Settings and helpers


  // Template.myContent.rendered = function () {
  //   groupWrapper = this.$(groupWrapperId)[0];
  //   createSortableGroups(groupWrapper);
  // };

  // Template.group.rendered = function () {
  //   createSortableItems(this.$('.' + groupItemsWrapperClass));
  // };



Template.ooSortableList.created = function () {
  var self = this;
  var collection = self.data.collection;
  self.TTT = 22;
  self.dataCursor = function() {
      return self.data.dataCursor;
    }
  self.listElement = new Blaze.ReactiveVar(false);
  self.updateSortPositions = function() {
    var el = self.listElement.get();
    // prevents form firing before dom is rendered
    if(el) {
      var items = $(el)[0].children;
      if(this.data.groupName){
        for (var i = items.length - 1; i >= 0; i--) {
          Collection[collection].update({_id: items[i].id}, {$set: {sortOrder: $(items[i]).index() + 1, group: $(items[i]).closest(".js-sortGroup").attr('id') }});
        }
      } else {
        for (var i = items.length - 1; i >= 0; i--) {
          Collection[collection].update({_id: items[i].id}, {$set: {sortOrder: $(items[i]).index() + 1}});
        }
      }
    }

  }
  if(this.data.groupName) {
    console.log('%c Test times   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
    self.autorun(function(){
      var count = Collection[collection].find({group: self.data.context._id}).count();
      console.log('%c count   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', count);
      self.updateSortPositions();
    })
  }

};


Template.ooSortableList.rendered = function () {
  var self = this;
  if (self.data.level){
    var classSelector = ".js-sortableList" + self.data.level
    var el = self.$(classSelector)[0];
  } else {
    var el = self.$(".js-sortableList")[0];
  }
  self.listElement.set(el);
  var collection = self.data.collection;
  // Set part of item as a drag handle
  var handle = self.data.handle ? self.data.handle : "";
  // Link multiple lists to allow moving items between
  var groupName = self.data.groupName ? self.data.groupName : null;
  new Sortable(el, {
    animation: 150,
    handle: handle,
    group: groupName,
    onStart: function (evt) {
            evt.oldIndex;  // element index within parent
            console.log('%c evt.oldIndex   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', evt);
            evt.preventDefault();
            evt.stopPropagation();
            return
        },
  });
};

// Template.ooSortableList.helpers({
//   listCursor : function () {
//    return Template.instance().dataCursor();
//   }
// });

Template.ooSortableList.events({
  'dragend .js-sortableList, dragend .js-sortableList2' : function (e, t) {
    t.updateSortPositions();
  }

});
