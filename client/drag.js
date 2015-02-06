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
  //       itemsCollection.update({_id: items[i].id}, {$set: {sortOrderPosition: $(items[i]).index() + 1, group: $(items[i]).closest(groupClass).attr('id') }});
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
  //         groupCollection.update({_id: items[i].id}, {$set: {sortOrderPosition: $(items[i]).index() }});
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



Template.ooSortableList.rendered = function () {
  var self = this;
  var el = self.$(".js-sortableList")[0];
  var collection = self.data.collection;
  // Set part of item as a drag handle
  var handle = self.data.handle ? self.data.handle : "";
  // Link multiple lists to allow moving items between
  var groupName = self.data.groupName ? self.data.groupName : null;
  console.log('%c groupName   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', groupName);
  new Sortable(el, {
    animation: 150,
    handle: handle,
    group: groupName,
    store: {
            /**
             * Get the order of elements. Called once during initialization.
             * @param   {Sortable}  sortable
             * @returns {Array}
             */
            get: function (sortable) {
                var order = localStorage.getItem(sortable.options.group);
                // console.log('%c order   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', order);
                return order ? order.split('|') : [];
            },

            /**
             * Save the order of elements. Called onEnd (when the item is dropped).
             * @param {Sortable}  sortable
             */
            set: function (sortable) {
                var order = sortable.toArray();
                console.log('%c order   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', order);
                localStorage.setItem(sortable.options.group, order.join('|'));
            }
        },
    // Element is dropped into the list from another list
        onAdd: function (/**Event*/evt) {
            var itemEl = evt.item;  // dragged HTMLElement
            evt.from;  // previous list
            // + indexes from onEnd
            console.log('%c evt add  ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', evt);
            console.log('%c this   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', this);
            console.log('%c options   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', this.options.store.get(this));
        },

        // Changed sorting within list
        onUpdate: function (/**Event*/evt) {
            var itemEl = evt.item;  // dragged HTMLElement
            // + indexes from onEnd
            console.log('%c evt update  ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', evt);
        },

        // Called by any change to the list (add / update / remove)
        onSort: function (/**Event*/evt) {
          console.log('%c evt sort  ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', evt);
            // same properties as onUpdate
        },
        // Element is removed from the list into another list
        onRemove: function (/**Event*/evt) {
            // same properties as onUpdate
            console.log('%c evt remove  ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', evt);
        }
    // onEnd: function (evt) {
    //   console.log('%c end1   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
    //   var items = el.children;
    //   for (var i = items.length - 1; i >= 0; i--) {
    //     // Collection[collection].update({_id: items[i].id}, {$set: {sortOrderPosition: $(items[i]).index() + 1 }});

    //     if(groupName) {
    //       console.log('%c group   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;', $(items[i]).closest(".js-sortGroup").attr('id'));
    //       Collection[collection].update({_id: items[i].id}, {$set: {sortOrderPosition: $(items[i]).index() + 1, group: $(items[i]).closest(".js-sortGroup").attr('id') }});
    //     } else {
    //       console.log('%c no group   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
    //       Collection[collection].update({_id: items[i].id}, {$set: {sortOrderPosition: $(items[i]).index() + 1 }});
    //     }

    //   }
    // }
    // onSort: function (evt) {
    //     console.log('%c evt   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', evt);
    // },
  });
};


// Template.ooSortableList.events({
//   'dragend .js-sortableList' : function (e, t) {
//     console.log('%c e   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
//     console.log('%c drag this   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', this);
//   }
// });
