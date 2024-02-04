const express = require("express");
const usersController = require("../controllers/users.js"); 
const topicController = require("../controllers/topic.js")

const apiRouter = express.Router();

apiRouter.get('/ping', function (req, res) {
    res.json({
        status: "OK",
        timestamp: (new Date()).getTime()
    });
});

apiRouter.post('/user', async (req, res) => {
    res.json(await usersController.createUser(req.body));
});

apiRouter.post('/connect', async (req, res) => {

    var attemptToConnect = await usersController.isThisUserExist(req.body.username, req.body.password)
    
    if(attemptToConnect.length == 1)
    {
      req.session.user = {
        "userID": attemptToConnect[0]._id,
        "username": req.body.username
      };
      console.log(req.session)
      res.json({status: 0, msg: ""});
    }else{
      req.session.destroy()
      res.json({status: -1, msg: "Impossible de se connecter"});
    }
  
  })

apiRouter.post('/topic', async (req, res) => {
    res.json(await topicController.createTopic(req.session.user.username, req.body.title, req.body.content));
})

apiRouter.get('/topics', async (req, res) => {
  res.json(await topicController.getTopics())
})

apiRouter.get('/topic/:topicID', async (req, res) => {
  res.json(await topicController.readTopic(req.params.topicID));
});

apiRouter.post('/message/:topicID', async (req, res) => {
  res.json(await topicController.createMessage(req.params.topicID, req.session.user.username, req.body.content))
})

apiRouter.get('/messages/:topicID', async (req, res) => {
  res.json(await topicController.getMessages(req.params.topicID))
})

// On exporte seulement le router
module.exports = apiRouter;