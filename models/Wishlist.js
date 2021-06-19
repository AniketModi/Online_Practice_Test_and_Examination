const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    Que_paper_id:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    }
})

const Wishlist = mongoose.model('wishlists',WishlistSchema)
module.exports = Wishlist