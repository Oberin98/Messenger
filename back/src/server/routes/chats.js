const express = require('express');
const router = express.Router();

const Chat = require('../../models/chat');
const User = require('../../models/user');



router.post('/', async (req, res) => {
  const { fullName, login, number, isAuth } = req.body;
  try {
    const userId = jwt.decode(isAuth)._id;
    const currentUser = await User.findOne({ _id: userId });
    const newContact = await User.findOne({ login });
    currentUser.friends.push({
      fullName,
      friendId: newContact._id
    })
    await currentUser.save();
    const chat = new Chat({
      members: [userId, newContact._id]
    })
    await chat.save()
    res.status(201).json({ chatId: chat._id });
  } catch (error) {
    res.status(404).send(error);
  }
})


module.exports = router;
