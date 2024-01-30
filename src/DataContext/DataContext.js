import { createContext, useState, useEffect} from "react";
//import Post  from "../Post"

import { format } from "date-fns"
import api from "../api/posts"
//import EditPost from "../EditPost"
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useNavigate } from "react-router-dom";

const DataContext = createContext({})

export const DataProvider = ( {children}) => {

    const [posts,setPosts] = useState([])

    const [search,setSearch]=useState('')
    const [searchResults,setSearchResults] = useState([])
    const [postTitle,setPostTitle]=useState('')
    const [postBody,setPostBody]=useState('')
    const navigate=useNavigate();
    const [editTitle,setEditTitle]=useState('')
    const [editBody,setEditBody]=useState('')
  
    const { width } = useWindowSize();
  
    const { data, isLoading, fetchError } = useAxiosFetch('http://localhost:3500/posts');
  
  
   /*useEffect(() => {
      const fetchPosts = async () => {
          try {
              const response = await api.get('/posts');
              setPosts(response.data);
          } catch (error) {
              if (error.response) {
                  // Not in the 200 response range
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              } else {
                  console.log(`Error: ${error.message}`);
              }
          }
      };
  
      fetchPosts();
  }, []); */
  
  useEffect(() => {
    setPosts(data);
  }, [data]);
  
  
    useEffect(() => {
      const filteredResults = posts.filter(
          (post) =>
              post.title.toLowerCase().includes(search.toLowerCase()) ||
              post.body.toLowerCase().includes(search.toLowerCase())
      );
  
      setSearchResults(filteredResults.reverse());
  }, [search, posts]);
  
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const datetime = format(new Date(), 'MMMM dd, yyyy pp'); //npm i date-fns -S
      const newPost = { id, title: postTitle, datetime, body: postBody };
      try{
      const response = await api.post('/posts', newPost);
  
          const allPosts = [...posts, response.data];
          setPosts(allPosts);
          setPostTitle('');
          setPostBody('');
          navigate('/');
      }catch(error){
    
          console.log(`Error: ${error.message}`);
      }
      
    
  };
  
  const handleDelete =  async(id) => {
    console.log(`${id}`);
    try{ 
   await api.delete(`/posts/${id}`)
       const postsList = posts.filter((post) => post.id !== id);
              setPosts(postsList);
              navigate('/'); 
    } catch(error){
      console.log(`Error: ${error.message}`);
    }
  } ;
  
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMM dd, yyy pp');
    const updatePost = {
        id,
        title: editTitle,
        datetime,
        body: editBody,
    };
  
    try {
        const response = await api.put(`/posts/${id}`, updatePost);
        setPosts(
            posts.map((post) =>
                post.id === id ? { ...response.data } : post
            )
        );
        setEditTitle('');
        setEditBody('');
     } catch (error) {
        console.log(`Error: ${error.message}`);
    }
  };

    return(
        <DataContext.Provider value={{
            width,search,setSearch,
            searchResults,fetchError, isLoading, postTitle, setPostTitle,postBody,setPostBody,handleSubmit,
            posts, editTitle,setEditTitle,editBody, setEditBody,handleEdit, handleDelete

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext

