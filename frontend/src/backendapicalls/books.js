import { axiosInstance } from "./axiosInstance";

// add book
export const AddBook = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/books/add-book", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all books
export const GetAllBooks = async () => {
  try {
    const response = await axiosInstance.get("/api/books/get-all-books");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update book
export const UpdateBook = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/books/update-book/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete book
export const DeleteBook = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/books/delete-book/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get book by id
export const GetBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/books/get-book-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


//Fetch based on user search
export const SearchBooks = async (searchText) => {
  try {
    const response = await axiosInstance.post(`/api/books/search-books`, {
      searchText,
    });
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};


//Fetch based on user search
export const SearchCategoryBooks = async (searchCategoryText) => {
  try {
    console.log("Inside SearchCategoryBooks " +searchCategoryText);
    const response = await axiosInstance.post(`/api/books/search-categorybooks`, {
      searchCategoryText,
    });
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};



//Fetch based on user search
export const SearchLanguageBooks = async (searchLanguageText) => {
  try {
    console.log("Inside SearchLanguageBooks " +searchLanguageText)
    const response = await axiosInstance.post(`/api/books/search-languagebooks`, {
      searchLanguageText,
    });
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};


//Fetch based on user search
export const SearchInstockBooks = async (searchInstockText) => {
  try {
    console.log("Inside SearchLanguageBooks " +searchInstockText)
    const response = await axiosInstance.post(`/api/books/search-instockbooks`, {
      searchInstockText,
    });
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};

//Fetch based on user search
export const SearchOutOfstockBooks = async (searchOutOfstockText) => {
  try {
    console.log("Inside SearchLanguageBooks " +searchOutOfstockText)
    const response = await axiosInstance.post(`/api/books/search-outofstockbooks`, {
      searchOutOfstockText,
    });
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};






