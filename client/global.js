Template.registerHelper("groups", function(){
  return Groups.find({}, {sort: {sortOrder: 1}});
})

Template.registerHelper("items", function(){
  return Players.find({group: this._id}, {sort: {sortOrder: 1}});
})

Template.registerHelper("itemsSingle", function(){
  return Players.find({}, {sort: {sortOrder: 1}});
})
