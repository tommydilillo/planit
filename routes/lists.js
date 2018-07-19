const express = require("express");
const router = express.Router();
const List = require("../models/list");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

// ADD ITEM
router.get("/item-add/:id", (req, res, next) => {
  let listId = req.params.id;
  List.findOne({ _id: listId })
    .then(list => {
      console.log(list);
      res.render("lists/item-add", { list });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

router.post("/item-add/:id", (req, res, next) => {
  const { name, location, category, visitDate, notes } = req.body;
  let listId = req.params.id;
  console.log("listID: " + listId);
  List.findById(listId)
    .then(list => {
      list.items.push({ name, location, category, visitDate, notes });
      list
        .save()
        .then(list => {
          res.redirect(`/lists/${list._id}`), { list };
        })
        .catch(error => {
          console.log(`Error on add item list route: ${error}`);
        });
    })
    .catch(error => {
      console.log(error);
    });
});
//EDIT ITEM

router.post("/item-edit/:id", (req, res, next) => {
  const { name, location, category, visitDate, notes } = req.body;
  let itemId = req.params.id;
  console.log("itemId: " + itemId);
  List.findOneAndUpdate(
    { "items._id": itemId },
    { "items.$": { name, location, category, visitDate, notes } }
  )
    .then(list => {
      // list.items
      //   .id(itemId)
      //   .update({ name, location, category, visitDate, notes });
      // list
      //   .save()
      //   .then(list => {
      res.redirect(`/lists/${list._id}`), { list };
      // }
      // )
      // .catch(error => {
      //   console.log(`Error on add item list route: ${error}`);
      // });
    })
    .catch(error => {
      console.log(error);
    });
});

// ----------------------------
//LISTS PAGE

router.get("/", (req, res, next) => {
  List.find()
    .then(lists => {
      res.render("lists/index", { lists });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

// ADD A NEW LIST
router.get("/add", (req, res, next) => {
  res.render("lists/add");
});

router.post("/add", (req, res, next) => {
  const { name, location, purpose, public } = req.body;
  const newList = new List({ name, location, purpose, public });
  newList
    .save()
    .then(list => {
      res.redirect("/lists");
    })
    .catch(error => {
      console.log(error);
    });
});

//LIST EDIT PAGE

router.get("/:id/edit", (req, res, next) => {
  let listId = req.params.id;
  List.findOne({ _id: listId })
    .then(list => {
      console.log(list);

      res.render("lists/edit", { list });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

router.post("/:id", (req, res, next) => {
  const { name, location, purpose, public } = req.body;
  List.update(
    { _id: req.params.id },
    { $set: { name, location, purpose, public } }
  )
    .then(list => {
      res.redirect("/lists");
    })
    .catch(error => {
      console.log(error);
    });
});

//DELETE LIST
router.post("/:id/delete", (req, res, next) => {
  let listId = req.params.id;
  List.findByIdAndRemove({ _id: listId })
    .then(list => {
      console.log(`list deleted`);
    })
    .catch(error => {
      console.log(error);
      next();
    })
    .next(res.redirect("/lists"));
});

// LIST DETAIL PAGE

router.get("/:id", (req, res, next) => {
  let listId = req.params.id;
  console.log(`listId: ${listId}`);
  if (!/^[0-9a-fA-F]{24}$/.test(listId)) {
    return res.status(404).render("not-found");
  }
  List.findOne({ _id: listId })
    .then(list => {
      console.log(list);
      res.render("lists/list-detail", { list });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

module.exports = router;
