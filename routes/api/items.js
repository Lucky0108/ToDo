const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../model/Item');


// @route Get api/items
// @desc Get All Items
// @ Public access

router.get('/',(req,res)=>{
    Item.find()
        .sort({date: -1})
        .then(items=>res.json(items));
});

// @route Post api/items
// @desc Post A Item
// @ Public access

router.post('/',(req,res)=>{
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item=>res.json(item))
    .catch(err=>res.json(err));
});

// @route Delete api/items:id
// @desc  Delete A Item
// @ Public access

router.delete('/:id',(req,res)=>{
    Item.findById(req.params.id)
    .then(item => item.remove().then(()=> res.json("Succefully Deleted!!")))
    .catch(err => res.json(console.log(err)))
});

module.exports=router;