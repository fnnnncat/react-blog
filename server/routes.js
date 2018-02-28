'use strict'

module.exports = function(ctx) {

    // extract context from passed in object
    const db = ctx.db,
        server = ctx.server

    // assign collection to variable for further use
    const collection = db.collection('posts')

    /**
     * Create
     */
    server.post('/publish', (req, res, next) => {

        // extract data from body and add timestamps
        const data = Object.assign({}, req.body, {
            created: new Date(),
            updated: new Date()
        })

        // insert one object into todos collection
        collection.insertOne(data)
            .then(doc => res.send(200, doc.ops[0]))
            .catch(err => res.send(500, err))

        next()

    })

    /**
     * articleList
     */
    server.get('/articleList', (req, res, next) => {

        let limit = parseInt(req.query.limit, 10) || 6, // default limit to 10 docs
            skip = parseInt(req.query.skip, 10) || 0, // default skip to 0 docs
            query = req.query || {}

        // remove skip and limit from query to avoid false querying
        delete query.skip
        delete query.limit

        // find todos and convert to array (with optional query, skip and limit)
        collection.find(query).skip(skip).limit(limit).toArray()
            .then(docs => res.send(200, docs))
            .catch(err => res.send(500, err))

        next()

    })
    /* 
    *popularArticle
    */
    server.get('/articlePopular',(req,res,next)=>{
        let query = req.query || {}
        // find todos and convert to array (with optional query, skip and limit)
        collection.find(query).skip(0).limit(5).sort({pv:-1}).toArray()
            .then(docs => res.send(200, docs))
            .catch(err => res.send(500, err))

        next()
    })
   /* 
    *search
    */
    server.get('/search',(req,res,next)=>{
        let query = req.query || {}
        let searchParam=req.query.searchParam
        var pattern = new RegExp(searchParam, "i");
        // find todos and convert to array (with optional query, skip and limit)
        collection.find({"title": pattern}).toArray()
            .then(docs => res.send(200, docs))
            .catch(err => res.send(500, err))

        next()
    })
    /* 
     *hot of tags
     */
    server.get('/artcileHot',(req,res,next)=>{
        let query =req.query || {}
        collection.aggregate(([{$group : {_id : "$label", num_tutorial : {$sum : 1}}}]),function( err, data ) {
             if ( err )
             throw err
             res.send(data)
            })

    next()
    })
     /* 
     *article of essays
     */
    server.get('/artcileEssays',(req,res,next)=>{
        let query =req.query || {}
        collection.aggregate(([

            {$group: {
                _id: {"$substr":["$creat_time",0,7]},
                count: {$sum: 1}
                }
            },
            {$sort: {"_id": 1}}
        ]),function(err,data){
            if(err)
             throw err
             res.send(data)
        })

    next()
    })
    /**
     * Update
     */
    server.put('/articleList/:id', (req, res, next) => {

        // extract data from body and add timestamps
        const data = Object.assign({}, req.body, {
            updated: new Date()
        })

        // build out findOneAndUpdate variables to keep things organized
        let query = {
                _id: req.params.id
            },
            body = {
                $set: data
            },
            opts = {
                returnOriginal: false,
                upsert: true
            }

        // find and update document based on passed in id (via route)
        collection.findOneAndUpdate(query, body, opts)
            .then(doc => res.send(204))
            .catch(err => res.send(500, err))

        next()

    })

    /**
     * Delete
     */
    server.del('/articleListDel/:id', (req, res, next) => {

        // remove one document based on passed in id (via route)
        collection.findOneAndDelete({
                _id: req.params.id
            })
            .then(doc => res.send(204))
            .catch(err => res.send(500, err))

        next()

    })

}