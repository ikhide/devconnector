const express = require("express");
const router = express.Router();

//@route GET aoi/users/test

router.get("/test", (req, res) => {
  res.json({ msg: "users works" });
});

module.exports = router;
