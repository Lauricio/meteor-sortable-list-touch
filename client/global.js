Template.registerHelper("groups", function(){
  return Groups.find({}, {sort: {sortOrderPosition: 1}});
})

Template.registerHelper("items", function(){
  return Players.find({group: this._id}, {sort: {sortOrderPosition: 1}});
})

Template.registerHelper("itemsSingle", function(){
  return Players.find({}, {sort: {sortOrderPosition: 1}});
})
