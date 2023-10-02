import { Col, message, Row, Table, Form, Badge } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteBook, GetAllBooks, SearchBooks,SearchCategoryBooks,SearchLanguageBooks,SearchInstockBooks,SearchOutOfstockBooks } from "../../backendapicalls/books";
import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { Tabs } from "antd";
const TabPane = Tabs.TabPane;
function Home() {

  const [books, setBooks] = React.useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText = "", setSearchText = ""] = useState("");
  const [searchCategoryText = "", setSearchCategoryText = ""] = useState("");
  const handleDropdownChange = (event) => {
    // Step 5: Update the state variable with the selected value
    setSelectedValue(event.target.value);
    setSearchCategoryText(event.target.value);
    if(searchCategoryText){
      console.log("Category Search" +searchCategoryText);
    }else{
      setSearchCategoryText(event.target.value);
    }
   // getSearchBooksCategory();

     
  };


  const searchLanguageBook = async (event) => {
    console.log("Inside searchLanguageBook");
    try{
      dispatch(ShowLoading());
      const responseLang = await SearchLanguageBooks(event.target.value);
      if (responseLang.success) {
        setBooks(responseLang.data);
      } else {
        //toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      // toast.error(error.message);
      dispatch(HideLoading());
    }

  }

  const searchCategoryBook = async (event) => {
    console.log("Inside searchCategoryBook");
    try{
      dispatch(ShowLoading());
      const responseCategory = await SearchCategoryBooks(event.target.value);
      if (responseCategory.success) {
        setBooks(responseCategory.data);
      } else {
        //toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      // toast.error(error.message);
      dispatch(HideLoading());
    }

  }

  const searchInStockBook = async (event) => {
    console.log("Inside searchInStockBook");
    try{
      dispatch(ShowLoading());
      const responseInstock = await SearchInstockBooks(event.target.value);
      if (responseInstock.success) {
        setBooks(responseInstock.data);
      } else {
        //toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      // toast.error(error.message);
      dispatch(HideLoading());
    }

  }

  const searchOutOfStockBook = async (event) => {
    console.log("Inside searchOutOfStockBook");
    try{
      dispatch(ShowLoading());
      const responseInstock = await SearchOutOfstockBooks(event.target.value);
      if (responseInstock.success) {
        setBooks(responseInstock.data);
      } else {
        //toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      // toast.error(error.message);
      dispatch(HideLoading());
    }

  }

  
 
 
  const getSearchBooks = async () => {
    try {
     // console.log("Inside getSearchBooks");
     
      dispatch(ShowLoading());
      const response = await SearchBooks(searchText);
      if (response.success) {
        setBooks(response.data);
      } else {
        //toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      // toast.error(error.message);
      dispatch(HideLoading());
    }
  };

 
  const getSearchBooksCategoryLanguageStock = async (event) => {
    try {
      setSelectedValue(event.target.value);
      console.log("Inside getSearchBooksCategory" +event.target.value);
      console.log("Inside getSearchBooksCategory" +searchCategoryText);
      dispatch(ShowLoading());
      if(event.target.value=='ALL'){
        searchAllBook(event);
      }else if (event.target.value=='INSTOCK'){
        searchInStockBook(event);
      
      }
      else if (event.target.value=='OUTOFSTOCK'){
        searchOutOfStockBook(event);
      
      }
      
      else if (event.target.value=='Kids' || event.target.value== 'Technical' ){
        // searchInStockBook(event);
        searchCategoryBook(event);
       }
       else {
        searchLanguageBook(event);
      }

    } catch (error) {
      // toast.error(error.message);
      dispatch(HideLoading());
    }
  };

  const searchAllBook = async (event) => {
    console.log("Inside searchAllBook");
    try{
      dispatch(ShowLoading());
      getBooks();
     
    }catch (error) {
      // toast.error(error.message);
      dispatch(HideLoading());
    }

  }

 



  const getBooks = async () => {
    try {
      //console.log("Inside getBooks");

      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

 
     

  useEffect(() => {
    getBooks();
   
  },[]);
  return (



    <div  className="mt-2">
      
      <h1>Search Filter</h1>
   <select value={selectedValue} onChange={getSearchBooksCategoryLanguageStock}>
        <option value="">Select an option</option>
        <option value="ALL">All Category</option>
        <option value="ENGLISH">English</option>
        <option value="MALAYALAM">Malayalam</option>
        <option value="INSTOCK">InStock</option>
        <option value="OUTOFSTOCK">OutOfStock</option>
        <option value="Kids">Kids</option>
        <option value="Technical">Technical</option>

      </select>
      <br></br>
      <br></br>
      <div className="flex gap-5 mt-5 items-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-1/2"
          placeholder="Search for Books"
        />
        <Button title="Search" onClick={getSearchBooks} />


      </div>


      <br></br>

      <Row gutter={[16, 16]}>
        {books.map((book) => {
          return (
            <Col xs={24} sm={24} md={12} lg={6} xl={6}
              key={book._id}
              onClick={() => navigate(`/book/${book._id}`)}
            >
              <Badge.Ribbon
                text={book.availableCopies > 0 ? "Available" : "Not Available"}
                color={book.availableCopies > 0 ? "green" : "red"}
              >
                <div className="rounded bg-white p-2 shadow flex flex-col gap-1">
                  <img src={book.image} height="350px" />
                  <h1 className="text-md text-secondary uppercase font-bold mt-2">
                    {book.title}
                  </h1>
                </div>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Home;
