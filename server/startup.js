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
        Players.insert({name: names[i], sortOrder: i + 1, group: Random.choice(["PkopJd5s6kHy8rwuX","4H9jcndvXgaiHdHd2", "pgge34GQ48mxBYRdM"])});
    }

    if (Groups.find().count() === 0) {
        Groups.insert({name: "Platinum", sortOrder: 1, _id: "PkopJd5s6kHy8rwuX"});
        Groups.insert({name: "Gold", sortOrder: 2, _id: "4H9jcndvXgaiHdHd2"});
        Groups.insert({name: "Silver", sortOrder: 3, _id: "pgge34GQ48mxBYRdM"});
    }
  });
