const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    //below block from 9-26 is when getting based off URL query 
    // const { limit, orderby } = req.query;
    // const query =  db.select('id', 'title', 'contents').from('posts')
    // //or instead of above, use below for all
    // //const query = db('posts')
    // if(limit){
    //     query.limit(limit);
    // }
    // if(orderby){
    //     query.orderBy(orderby);
    // }
    // query
    // .then(posts => {
    //     res.status(200).json(posts)
    // }).
    // catch(error => {
    //     res.status(500).json({error: 'error getting posts'})
    // })   
    
    //db in line below is really knex, but knex is being represented by db
    //db.select('id', 'title', 'contents').from('posts')
    db('posts') // returns all a promise to all records from the posts
    //db.select('*').from('posts') same as line above, 11, 11 is just shorthand for grabbing all columns
    .then(posts => {
        res.status(200).json(posts)
    }).
    catch(error => {
        res.status(500).json({error: 'error getting posts'})
    })
});

router.get('/:id', (req, res) => {
    db('posts').where({id: req.params.id})
    //.first() this lets us do same as line 26, used with line 25. Line 26 is a different way of doing it
    .then(posts => {
        //res.status(200).json(posts)// this grabs an array, below grabs the object in the array
        res.status(200).json(posts[0])
    })
    .catch(error => {
        res.status(500).json({error: 'error getting posts'})
    })
});

router.post('/', (req, res) => {
    const post = req.body;
    //validate that the post data is correct before saving to the DB
    //later this week this is where validation will occur
    db('posts')
    .insert(post, 'id') //insert returns array, returns the last record of what was added, in this case id
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        res.status(500).json({error: 'error getting posts'})
    })
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    db('posts')
    .where('id', '=', req.params.id) //different way to set the id
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json(count) //count represents how many tables were updated
        } else {
            res.status(404).json({error: 'not found'})
        }
    }).
    catch(error => {
        res.status(500).json({error: 'error updating to posts'})
    })
});

router.delete('/:id', (req, res) => {
    db('posts')
    .where('id', '=', req.params.id) //different way to set the id
    .del()
    .then(count => {
        if(count > 0) {
            res.status(200).json(count) //count represents how many tables were updated
        } else {
            res.status(404).json({error: 'not found'})
        }
    }).
    catch(error => {
        res.status(500).json({error: 'error updating to posts'})
    })
});

module.exports = router;