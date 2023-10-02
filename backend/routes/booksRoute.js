const router = require("express").Router();
const Book = require("../models/booksModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add a book
router.post("/add-book", authMiddleware, async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    return res.send({ success: true, message: "Book added successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// update a book
router.put("/update-book/:id", authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    return res.send({ success: true, message: "Book updated successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// delete a book
router.delete("/delete-book/:id", authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    return res.send({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// get all books
router.get("/get-all-books", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.send({ success: true, data: books });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});
// get a book by id
router.get("/get-book-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    return res.send({ success: true, data: book });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// search for a book
router.post("/search-books", authMiddleware, async (req, res) => {
  try {
    const searchText = req.body.searchText;

    // search for books with the given search text in their name
    const searchbooks = await Book.find({
      title: {
        $regex: searchText,
        $options: "i",
      },
      
    });

    res.send({
      success: true,
      message: "Books fetched successfully",
      data: searchbooks,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// search for a book
router.post("/search-categorybooks", authMiddleware, async (req, res) => {
  try {
  

    let searchCategoryText = req.body.searchCategoryText;
    console.log("Inside Router" +req.body);
    console.log("Inside Router" +searchCategoryText);

    // search for books with the given search text in their name
  
   
   const  searchCategorybooks = await Book.find({
       category: {
        $regex: searchCategoryText,
        $options: "i",
      }
          });
    console.log("Response " +searchCategorybooks);
    res.send({
      success: true,
      message: "Books fetched based on category successfully",
      data: searchCategorybooks,
    });
  } catch (error) {
    console.log("Error" +error)
    res.send({
      success: false,
      message: error.message,
    });
  }
});


// search for a book
router.post("/search-languagebooks", authMiddleware, async (req, res) => {
  try {
  

    let searchLanguageText = req.body.searchLanguageText;
    console.log("Inside Router" +req.body);
    console.log("Inside Router" +searchLanguageText);

    // search for books with the given search text in their name

   
    const searchLanguagebooks = await Book.find({
       language: {
        $regex: searchLanguageText,
        $options: "i",
      }
          });
    console.log("Response " +searchLanguagebooks);
    res.send({
      success: true,
      message: "Books fetched based on category successfully",
      data: searchLanguagebooks,
    });
  } catch (error) {
    console.log("Error" +error)
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// search for a book
router.post("/search-instockbooks", authMiddleware, async (req, res) => {
  try {
  

    let searchInstockText = req.body.searchInstockText;
    console.log("Inside Router" +req.body);
    console.log("Inside Router" +searchInstockText);

    // search for books with the given search text in their name

   
    const searchInstockbooks = await Book.find({
       availableCopies: {
        $gt: 0
      }
          });
    console.log("Response " +searchInstockbooks);
    res.send({
      success: true,
      message: "Books fetched based on category successfully",
      data: searchInstockbooks,
    });
  } catch (error) {
    console.log("Error" +error)
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// search for a book
router.post("/search-outofstockbooks", authMiddleware, async (req, res) => {
  try {
  

    let searchOutOfstockText = req.body.searchOutOfstockText;
    console.log("Inside Router" +req.body);
    console.log("Inside Router" +searchOutOfstockText);

    // search for books with the given search text in their name

   
    const searchOutOfstockbooks = await Book.find({
       availableCopies: {
        $lt: 1
      }
          });
    console.log("Response " +searchOutOfstockbooks);
    res.send({
      success: true,
      message: "Books fetched based on category successfully",
      data: searchOutOfstockbooks,
    });
  } catch (error) {
    console.log("Error" +error)
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
