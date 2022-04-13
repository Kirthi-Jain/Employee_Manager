const router = require("express").Router(),
  Register = require("../models/userSchema");

router.post("/register", (req, res) => {
  new Register(req.body)
    .save()
    .then(r => res.status(201).json("Employee Added"))
    .catch(e => res.status(422).json(e.message));
});

router.get("/getdata", async (req, res) => {
  try {
    const users = await Register.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(422).json(error.message);
  }
});

router.get("/getdata/:_id", async (req, res) => {
  try {
    const { _id } = req.params,
    user = await Register.findById(_id);    
    res.status(201).json(user);
  } catch (error) {
    res.status(422).json(error.message);
  }
});

router.put("/update/:_id", async (req, res) => {
  try {
    const {body , params} = req,
      { email } = body,
      user = await Register.findOne(params);
    if (email != user.email) {
      const check = await Register.findOne({ email });
      if (check) {
        return res.status(422).json("Email taken already!");
      }
    }
    await Register.updateOne(user, body, { upsert: true })
      .then(r => res.status(201).json("Updated"))
      .catch(e => res.status(422).json(e.message));
  } catch (error) {
    res.status(432).json(error.message);
  }
});

router.delete("/delete/:_id", async (req, res) => {
  const { params } = req,
    user = await Register.findOne(params);
  Register.deleteOne(user)
    .then(r => res.status(201).json("User deleted successfully!"))
    .catch(function (e) {
      res.status(422).json(e.message);
    });
});

module.exports = router;
