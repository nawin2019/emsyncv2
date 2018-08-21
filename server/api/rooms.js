const router = require('express').Router();
const {Room} = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll({include: {all: true}});
    // console.log('ROOMS ROUTE: ', rooms);
    res.json(rooms);
  } catch (err) {
    console.log('get rooms');
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    //console.log('attempt was made');
    const room = await Room.findById(req.params.id, {include: {all: true}});
    //console.log('ROOM: ', room);
    res.json(room);
  } catch (err) {
    res.json(`Room doesn't exist`)
    console.log('err');
  }
});

router.put('/', async (req, res, next) => {
  // console.log('REQ>BODY', req.body);
  try{
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);
  }catch (err) {
    res.status(400).json('Room not created')
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    await room.destoy();
    res.status(204);
  } catch (err) {
    console.log('deleted unsuccessfully', err);
  }
});

module.exports = router;
