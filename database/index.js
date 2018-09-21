/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const MONGOLINK = require('../config').MONGOLINK;

const config = require('../config');


// mongoose.connect(MONGOLINK, { useMongoClient: true });
mongoose.connect(process.env.MLAB);

// plug in the promise library:
mongoose.Promise = global.Promise;
const db = mongoose.connection;


db.on('error', () => {
  // console.log('here', MONGOLINK);
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const reviewSchema = mongoose.Schema({
  title: String,
  username: String,
  reviewText: String,
  reviewRating: Number,
});

//create UserReviewSchema
const userReviewSchema = mongoose.Schema({
  username: String,
  title: String,
  text: String,
  rating: Number
})

const UserReview = mongoose.model('UserReview', userReviewSchema);

const saveUserReview = (reviewObject, response) => {
  const newUserReview = new UserReview({reviewObject});
  // const newUserReview = new UserReview({
  //   username,
  //   title,
  //   text,
  //   rating
  // });
  newUserReview.save(err => {
    if (err) {
      console.log(`error saving review into database saveuserreview function ${err}`)
    } else {
      console.log('successfully saves review to database')
      response.status(201, 'OK');
      // response.redirect('/');
      response.end();
    }
  })
}
const Review = mongoose.model('Review', reviewSchema);

const saveReview = (title, username, reviewText, reviewRating, cb) => {
  const review = new Review({
    title,
    username,
    reviewText,
    reviewRating,
  });
  review.save((err, doc) => {
    if (err) {
      cb(err);
    } else {
      cb(err, doc);
    }
  });
};

//add function to query database for userReviews to display on DOM
const query = Review.find();
const findUserReviews = callback => {
  query.limit(3).select('title reviewText reviewRating').exec(callback);
}

const allReviews = (cb) => {
  Review.find({}, (err, books) => {
    if (err) {
      cb(err);
    } else {
      cb(err, books);
    }
  });
};

const bookSchema = mongoose.Schema({
  title: { type: String, unique: true },
  description: String,
  ISBN13: Number,
  bookWormRating: Number,
  googleRating: Number,
  libThingRating: Number,
  goodReadsRating: Number,
  userRating: [Number],
  cover: String,
});

const Book = mongoose.model('Book', bookSchema);

const saveBook = (bookObj, cb) => {
  const book = new Book({
    title: bookObj.title,
    description: bookObj.longDescript,
    ISBN: bookObj.ISBN13,
    bookWormRating: bookObj.aggregateRating,
    googleRating: bookObj.rating,
    libThingRating: bookObj.libThingRating,
    goodReadsRating: bookObj.gReadsRating,
    userRating: 2.5,
    cover: bookObj.coverImage,
  });
  book.save((err) => {
    if (err) {
      cb(err);
    }
  });
};

const allBooks = (cb) => {
  Book.find({}, (err, books) => {
    if (err) {
      cb(err);
    } else {
      cb(err, books);
    }
  });
};

const addRating = (title, rating, cb) => {
  Book.findOneAndUpdate({ title }, { $push: { userRating: rating } }, (err, doc) => {
    if (err) { cb(err); } else {
      cb(err, doc);
    }
  });
};

// var query = {'username':req.user.username};
// req.newData.username = req.user.username;
// MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
//     if (err) return res.send(500, { error: err });
//     return res.send("succesfully saved");
// });

const userBooksSchema = mongoose.Schema({
  username: String,
});

const UserBook = mongoose.model('UserBook', userBooksSchema);

const saveUser = (name, pass) => {
  const salt = bcrypt.genSaltSync(10);


  const hash = bcrypt.hashSync(pass, salt);
  const user = new User({
    username: name,
    password: hash,
  });
  user.save((error) => {
    if (error) {
      console.log('ERROR SAVING USER');
      console.error(error);
    }
  });
};
const findUser = (username, callback) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, user);
      return true;
    }
  });
};

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 * * */

const comparePassword = (password1, password2) => bcrypt.compareSync(password1, password2);

// find a user and validate them with passport
const passportValidate = (un, pw) => {
  User.findOne({ username: un }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect username or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }
    // check if a hashed user's password is equal to a value saved in the database
    return comparePassword(pw, user.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!user) {
        const error = new Error('Incorrect username or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id,
      };

      // create a token string
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        name: user.name,
      };

      return done(null, token, data);
    });
  });
};

const booksquirmSchema = mongoose.Schema({

});

const booksquirm = {

};
module.exports = {
  comparePassword,
  findUser,
  saveUser,
  saveBook,
  passportValidate,
  allBooks,
  addRating,
  saveUserReview,
  findUserReviews,
  // saveReview,
  allReviews,
};
