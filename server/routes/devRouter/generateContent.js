module.exports = function (req, res) {

    var faker = require('faker');
    var connectionTypes = require('../../security/connectionTypes.json');
    var models          = require('../../models');
    var itemUrlList     = require('./itemUrlList.json');

    var colors = ['CFD8DC','FF887A','FFD373','FFFF7C','A4ABFF','78D6FF','A4FFEB','CBFF8A'];
    var visibility = ['PUBLIC', 'PRIVATE', 'UNINDEXED'];

    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    function createUser(i){
        var user =  new models.User();
        user.email =  i+faker.internet.exampleEmail();
        var username = faker.internet.userName();
        user.unsafeUsername = username;
        user.name = username;
        user.local.password = 'password'+i;
        user.roles = ['ROLE_USER'];
        user.connectionTypes.push(connectionTypes.LOCAL.id);
        user.save();
    }

    var collectionNb = 50;
    createCollection(0);

    function createCollection(i){
        var itemNb = Math.floor(Math.random() * 30);
        var collection =  new models.Collection();
        collection.title = faker.lorem.words().capitalizeFirstLetter();
        collection.bio = faker.lorem.sentence().capitalizeFirstLetter();
        collection.itemsCount = itemNb;
        collection.color = colors[Math.floor(Math.random() * colors.length)];
        collection.visibility = visibility[Math.floor(Math.random() * visibility.length)];
        collection._author = req.user._id;
        collection.save(function(err){


            creatItem(0);
            function creatItem(x){
                var itemUrl = new models.ItemUrl();
                var item = new models.Item();
                randItemUrl = itemUrlList[Math.floor(Math.random() * itemUrlList.length)];
                itemUrl.url = randItemUrl.url;
                itemUrl.host = randItemUrl.host;
                itemUrl.image = randItemUrl.image;
                itemUrl.title = randItemUrl.title;
                itemUrl.description = randItemUrl.description;
                itemUrl.author = randItemUrl.author;
                itemUrl.type = randItemUrl.type;
                itemUrl.site_name = randItemUrl.site_name;
                itemUrl.save(function(err){
                    item._content = itemUrl._id;
                    item._collection = collection._id;
                    item.save(function(err){
                        x++;
                        if(i>=collectionNb)return;
                        if(x>=itemNb){
                            i++;
                            if(i>=collectionNb)return;
                            else createCollection(i);
                        }else creatItem(x);
                    })
                })
            }

        });

    }



    res.json({message: 'done'});
}
