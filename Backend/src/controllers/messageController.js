const Message = require('../models/Message')

async function getMessages(req, res, next) {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).lean()
    res.json(messages.map((message) => ({
      id: message._id,
      sender: message.sender,
      text: message.text,
      time: new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(message.createdAt),
      createdAt: message.createdAt,
    })))
  } catch (error) {
    next(error)
  }
}

async function createMessage(req, res, next) {
  try {
    const text = typeof req.body.text === 'string' ? req.body.text.trim() : ''
    if (!text) {
      return res.status(400).json({ message: 'Message text is required.' })
    }
    if (text.length > 2000) {
      return res.status(400).json({ message: 'Message text must be 2000 characters or fewer.' })
    }

    const sender = ['maya', 'jordan'].includes(req.body.sender) ? req.body.sender : null
    if (!sender) {
      return res.status(400).json({ message: 'Choose Maya or Jordan before sending.' })
    }

    const message = await Message.create({ sender, text })
    res.status(201).json({
      id: message._id,
      sender: message.sender,
      text: message.text,
      time: new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(message.createdAt),
      createdAt: message.createdAt,
    })
  } catch (error) {
    next(error)
  }
}

async function deleteMessage(req, res, next) {
  try {
    const sender = req.query.sender
    if (!['maya', 'jordan'].includes(sender)) {
      return res.status(400).json({ message: 'A valid sender is required.' })
    }

    const message = await Message.findOneAndDelete({ _id: req.params.id, sender })
    if (!message) {
      return res.status(404).json({ message: 'Message not found or you cannot delete it.' })
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

module.exports = { getMessages, createMessage, deleteMessage }
