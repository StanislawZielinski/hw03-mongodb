const express = require('express')
const router = express.Router()
const User = require("../../models/user");
const UserSchema = require('../../services/schemas/userSchema');
const joi = require('../../utils/joi/joi');


router.get('/', async (req, res, next) => {
  try {
    // const response = await contacts.listContacts();
    res.status(200).json({ 
    status: 200,
    data: "use: /users/signup -> to register   or   /contacts -> to get contacts" });
  } catch (error) {
    console.log(error)
  }
})

// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const {contactId} = req.params;
//     const response = await contacts.getContactById(contactId);
//     if (response) {
//       res.status(200).json({ 
//         status: 200,
//         data: response });
//     } else {
//       res.status(404).json({ message: 'User not exist' })
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: 'Not found' })
//   }
// })

router.post('/users/signup', async (req, res, next) => {
  try {
    const body = req.body;
    const { email, password } = req.body
    const result = joi.schemaRegistration.validate(body);
    const { error } = result; 
    const ifUserAlreadyExist = await UserSchema.findOne({email})
    if (ifUserAlreadyExist) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email is already in use',
        data: 'Conflict',
      })
    };
      if (error) {
        const errorMessage = error.details.map((elem)=>elem.message);
        res.status(400).json({ message: errorMessage })
      } else {
        const newUser = new UserSchema ({ email, password });
        newUser.setPassword(password);
        await newUser.save();
        const response = {
          "user":{
            "email":email,
            "subscription": "starter"
          }
        }
          res.status(201).json({
              status:201,
              data:response
          })
        }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Not found' })
  }
});

// router.put('/:contactId', async (req, res, next) => {
//   try {
//     const {contactId} = req.params;
//     const contactFile = await contacts.getContactById(contactId);
//     const body = req.body;
//     const result = joi.schemaPut.validate(body);
//     const { error } = result; 
//     if (contactFile) {
//       if (!error) {
//         const response = await contacts.updateContact(contactId, body);
//         res.status(200).json({ 
//           status: 200,
//           message: response});
//       } else {
//         const errorMessage = error.details.map((elem)=>elem.message);
//         res.status(400).json({ message: errorMessage })
//       }
//     } else {
//       res.status(404).json({ message: 'Not found' })
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: 'Not found' })
//   }
// });

// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const {contactId} = req.params;
//     const contactFile = await contacts.getContactById(contactId);
//     if (contactFile) {
//       await contacts.removeContact(contactId);
//       res.status(200).json({ 
//         status: 200,
//         message: 'contact deleted'});
//     } else {
//       res.status(404).json({ message: 'Not found' })
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: 'Not found' })
//   }  
// })

// router.patch('/:contactId/favorite', async (req, res, next) => {
//   try {
//     const {contactId} = req.params;
//     const contactFile = await contacts.getContactById(contactId);
//     const body = req.body;
//     const result = joi.schemaFavorite.validate(body);
//     const { error } = result; 
//     if (contactFile && !error) {
//         const response = await contacts.updateStatusContact(contactId, body);
//         res.status(200).json({ 
//           status: 200,
//           message: response});
//     } else {
//       const errorMessage = error.details.map((elem)=>elem.message);
//       res.status(400).json({ message: errorMessage})
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: 'Not found' })
//   }  
// });

module.exports = router