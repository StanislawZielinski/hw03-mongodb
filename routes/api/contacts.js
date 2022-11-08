const express = require('express')
const router = express.Router()
const contacts = require("../../models/contacts");
const joi = require('../../utils/joi/joi');

router.get('/', async (req, res, next) => {
  try {
    const response = await contacts.listContacts();
    res.status(200).json({ 
    status: 200,
    data: response });
  } catch (error) {
    console.log(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const response = await contacts.getContactById(contactId);
    if (response) {
      res.status(200).json({ 
        status: 200,
        data: response });
    } else {
      res.status(404).json({ message: 'User not exist' })
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Not found' })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const canSave = [body.name, body.email, body.phone].every(Boolean);
    if (canSave) {
      const result = joi.schema.validate(body);
      const { error } = result; 
      if (error) {
        const errorMessage = error.details.map((elem)=>elem.message);
        res.status(400).json({ message: errorMessage })
      } else {
        const response = await contacts.addContact(body)
        res.status(201).json({
          status:201,
          data:response
        })
      }
    } else {
      res.status(400).json({ message: 'missing required field' })
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Not found' })
  }
});


router.put('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contactFile = await contacts.getContactById(contactId);
    const body = req.body;
    const {name, email, phone, favorite} = body;
    const canSave = [name, email, phone, favorite].some(Boolean);
    const result = joi.schema.validate(body);
    const { error } = result; 
    if (contactFile) {
      if (canSave && !error) {
        const response = await contacts.updateContact(contactId, body);
        res.status(200).json({ 
          status: 200,
          message: response});
      } else {
        const errorMessage = error.details.map((elem)=>elem.message);
        res.status(400).json({ message: errorMessage })
      }
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Not found' })
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contactFile = await contacts.getContactById(contactId);
    if (contactFile) {
      await contacts.removeContact(contactId);
      res.status(200).json({ 
        status: 200,
        message: 'contact deleted'});
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Not found' })
  }  
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contactFile = await contacts.getContactById(contactId);
    const body = req.body;
    const result = joi.schema.validate(body);
    const { error } = result; 
    if (contactFile && !error) {
      const key = Object.keys(body);
      if (key.length===1 && key.includes('favorite')) {
        const response = await contacts.updateStatusContact(contactId, body);
        res.status(200).json({ 
          status: 200,
          message: response});
      } else {
        res.status(400).json({ message: 'missing field favorite or too many fields'})
      }

    } else {
      const errorMessage = error.details.map((elem)=>elem.message);
      res.status(400).json({ message: errorMessage})
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Not found' })
  }  
});

module.exports = router