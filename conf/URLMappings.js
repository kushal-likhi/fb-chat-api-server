/**
 * URL Mappings are done in this file.
 *
 * "_app" is the express app object. Rest is all express.
 * */

//Require Controllers
var controllers = {
    cluster: require("../controllers/ClusterController"),
    jabber: require("../controllers/JabberController")
};

//Cluster API
_app.get("/cluster/worker/list", controllers.cluster.list);

//FB Chat API
_app.get("/api/fb/chat/message/send", controllers.jabber.sendFBChatMessage);