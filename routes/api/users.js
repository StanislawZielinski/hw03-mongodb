const express = require('express')
const router = express.Router()
const user = require("../../models/user");
const UserSchema = require('../../services/schemas/userSchema');
const joi = require('../../utils/joi/joi');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const {auth} = require('../../authorization/auth');
// const passportJWT = require('passport-jwt');

router.get('/', auth, async (req, res, next) => {
  try {
    const { email } = req.user
      res.status(200).json({ 
      status: 200,
      data: `Authorization was successful: ${email}`
    });
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


router.post('/users/login', async (req, res, next) => {
  try {
    const body = req.body;
    const { email, password } = req.body
    const result = joi.schemaRegistration.validate(body);
    const { error } = result; 
    if (error) {
      const errorMessage = error.details.map((elem)=>elem.message);
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: errorMessage,
        data: 'Conflict',
      })
    };

    const findUser = await user.getUserByEmail(email); 
    if (!findUser || !findUser.validPassword(password)) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: "Email or password is wrong",
        data: 'Conflict',
      })
    } else {
        const payload = {
          id:findUser.id,
          email: findUser.email
        }
        const token = jwt.sign(payload, secret, {expiresIn: '1h'});
        // console.log(token);
        const response = await user.loginUser(findUser.id, token);
        res.status(200).json({
            status:200,
            data:response
        });
        // const verify = jwt.verify(token, secret);
        // console.log(verify);
      }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Not found' })
  }
});

router.get('/users/logout', auth, async (req, res, next) => {
  try {
    console.log(req.user);
    const { id } = req.user;
    const response = await user.logoutUser(id);
    console.log(response);
      res.status(204).json({ 
      status: 204,
      data: `Logout successful: ${response}`
    });
  } catch (error) {
    console.log(error)
  }
})
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