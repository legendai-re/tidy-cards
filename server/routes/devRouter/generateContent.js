module.exports = function (req, res) {

    var faker = require('faker');
    var bCrypt = require('bcrypt-nodejs');
    var connectionTypes = require('../../security/connectionTypes.json');
    var models          = require('../../models');
    var itemUrlList     = require('./data/itemUrlList.json');

    var colors = ['CFD8DC','FF887A','FFD373','FFFF7C','A4ABFF','78D6FF','A4FFEB','CBFF8A'];
    var visibility = ['PUBLIC', 'PRIVATE', 'UNINDEXED'];

    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    var collectionNb = req.body.collectionNb;
    var userNb = req.body.userNb;
    var userList = null;

    if(userNb && userNb!=0){
        createUser(0);
    }else{
        models.User.find(function(err, users){
            userList = users;
            createCollection(0);
        })
   }

    function createUser(i){
        var user =  new models.User();
        user.email =  i+faker.internet.exampleEmail();
        var username = faker.internet.userName();
        user.unsafeUsername = username;
        user.name = username;
        user.local.password = createHash('password');
        user.roles = ['ROLE_USER'];
        user.connectionTypes.push(connectionTypes.LOCAL.id);
        user.save(function(err){
            i++;
            if(i==userNb){
                models.User.find(function(err, users){
                    userList = users;
                    createCollection(0);
                })
            }else{
                createUser(i);
            }
        });
    }

    function createHash (password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

    function createCollection(i, cb){
        var itemNb = Math.floor(Math.random() * 30);
        var collection =  new models.Collection();
        collection.title = faker.lorem.words().capitalizeFirstLetter();
        collection.bio = faker.lorem.sentence().capitalizeFirstLetter();
        collection.itemsCount = itemNb;
        collection.color = colors[Math.floor(Math.random() * colors.length)];
        collection.visibility = visibility[Math.floor(Math.random() * visibility.length)];
        collection._author = userList[Math.floor(Math.random() * userList.length)]._id;
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
                        if(i>=collectionNb){
                            res.json({message: 'done'});
                            return
                        }
                        if(x>=itemNb){
                            i++;
                            if(i>=collectionNb)return res.json({message: 'done'});
                            else createCollection(i);
                        }else creatItem(x);
                    })
                })
            }

        });
    }


}
