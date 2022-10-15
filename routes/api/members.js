const express = require("express");
const router = express.Router();
//generates random id
const uuid = require("uuid");
const members = require("../../Members");

//return the member info as JSON when we hit this route
// don't need to do stringify even though info is js objects, b/c json() takes care of it
//gets all members
router.get("/", (req, res) => res.json(members));

//get single member
router.get("/:id", (req, res) => {
  const found = members.some((mem) => mem.id === parseInt(req.params.id));
  //can use ternary operator here or if/else
  found
    ? res.json(members.filter((mem) => mem.id === parseInt(req.params.id)))
    : res.status(400).json({ msg: `No member with id of ${req.params.id}` });
});

//create member (create member object)
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include name and email" });
  }
  members.push(newMember);
  res.json(members);
});

//update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    //if found update member
    const updMember = req.body;
    console.log("REQ.body", req.body);
    console.log("req.params.id", req.params.id);
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

//delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
