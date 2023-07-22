import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

export const signin = (req, res) => {
  console.log('signin');
  console.log(req.body);
  if (req.body.phone.length === 0 || req.body.password.length === 0) {
    return res.status(400).send({
      msg: 'Enter complete details...',
    });
  }

  userModel
    .findOne({ phone: req.body.phone })
    .then((users) => {
      if (!users) {
        console.log('User not found');
        res.status(404).send({
          msg: 'User not found',
        });
      }
      bcrypt.compare(req.body.password, users.password, (err, result) => {
        if (result == true) {
          // console.log(process.env)
          // let jwtsecretKey = process.env.KEY;
          // let data = {
          //   time: new Date(),
          //   password: users.password,
          // };
          // const token = jwt.sign(data, jwtsecretKey);
          res.status(202).send({ users });
        } else {
          console.log(err, 'Invalid phone or password');
          res.status(401).send({
            msg: 'Invalid phone or password',
          });
        }
      });
    })
    .catch((err) => {
      console.log(err, 'Invalid phone or password');
      res.status(401).send({
        msg: 'Invalid phone or password',
      });
    });
};

export const signup = async (req, res) => {
  console.log('signup');
  console.log(req.body);
  // console.log(req.body.email)
  if (
    req.body.email.length === 0 ||
    req.body.password.length === 0 ||
    req.body.phone.length === 0 ||
    req.body.fullname.length === 0
  ) {
    return res.status(401).send({
      msg: 'Enter complete details...',
    });
  }
  const pwd = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(pwd, salt);

  let found = await userModel.find({ phone: req.body.phone });
  if (found.length !== 0) {
    return res.status(400).send({
      msg: 'Phone already in use',
    });
  }
  const user = new userModel({
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    fullname: req.body.fullname,
  });
  user
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err, 'Error Occured while creating records.........');
      res.status(500).send({
        msg: 'Error Occured while creating records.........',
      });
    });
};
