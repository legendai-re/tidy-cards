module.exports = function (req, res) {

    var faker = require('faker');
    var bCrypt = require('bcrypt-nodejs');
    var connectionTypes = require('../../security/connectionTypes.json');
    var models          = require('../../models');
    var itemTypes       = require('../../models/item/itemTypes');
    var itemUrlList     = require('./data/itemUrlList.json');
    var itemYoutubeList = require('./data/itemYoutubeList.json');

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
        user.local.active = true;
        user.roles = ['ROLE_USER'];
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
                var types = ['URL', 'URL', 'URL', 'URL', 'URL', 'URL', 'URL', 'URL', 'URL','YOUTUBE'];
                var type = types[Math.floor(Math.random() * types.length)];
                var item = new models.Item();
                item.type = type;

                if(type == 'URL')
                    var content = getItemUrl();
                if(type == 'YOUTUBE')
                    var content = getItemYoutube();

                content.save(function(err){
                    if(err)console.log(err);
                    item._content = content._id;
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

    function getItemUrl(){
        var itemUrl = new models.ItemUrl();
        randItemUrl = itemUrlList[Math.floor(Math.random() * itemUrlList.length)];
        itemUrl.url = randItemUrl.url;
        itemUrl.host = randItemUrl.host;
        itemUrl.image = randItemUrl.image;
        itemUrl.title = randItemUrl.title;
        itemUrl.description = randItemUrl.description;
        itemUrl.author = randItemUrl.author;
        itemUrl.site_name = randItemUrl.site_name;
        return itemUrl;
    }

    function getItemYoutube(){
        var itemYoutube = new models.ItemYoutube();
        randItemYoutube = itemYoutubeList[Math.floor(Math.random() * itemYoutubeList.length)];
        itemYoutube.url = randItemYoutube.url;
        itemYoutube.embedUrl = randItemYoutube.embedUrl;
        itemYoutube.videoId = randItemYoutube.videoId
        return itemYoutube;
    }
}
