const router = require("express").Router();
const { Message } = require("../db/models");
module.exports = router;


//get all messages
router.get("/", (req, res, next) => {
  Message.findAll()
    .then(messages => res.json(messages))
    .catch(next);
});


//get message by channelID
router.get('/:eventId', (req, res, next) => {
  Message.findAll({
    where: {eventId: req.params.eventId}
  })
  .then(messages => res.json(messages))
  .catch(next)
})

//post new message
router.post('/', (req, res, next) => {
  Message.create(req.body)
  .then(message => res.json(message))
  .catch(next)
})
