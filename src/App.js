import About from "./About"
import Header from "./Header"
import Footer from "./Footer"
import Home from "./Home"
import Missing from "./Missing"
import Nav from "./Nav"
import NewPost from "./NewPost"
import PostPage from "./PostPage"
//import PostLayout from "./PostLayout"
import { Routes, Route } from "react-router-dom"
//import Post  from "./Post"
//import { useEffect, useState } from "react"
//import { format } from "date-fns"
//import api from "./api/posts"
import EditPost from "./EditPost"
import { DataProvider } from "./DataContext/DataContext"
//import useAxiosFetch from "../../social_app/src/hooks/useAxiosFetch"
//import useWindowSize from "../../social_app/src/hooks/useWindowResize"

function App() {

 /* const [posts,setPosts] = useState([])

  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults] = useState([])
  const [postTitle,setPostTitle]=useState('')
  const [postBody,setPostBody]=useState('')
  const navigate=useNavigate();
  const [editTitle,setEditTitle]=useState('')
  const [editBody,setEditBody]=useState('')

 /* useEffect(() => {
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
}, []);
const { width } = useWindowSize();
 const { data, isLoading, fetchError } = useAxiosFetch('http://localhost:3500/posts');
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
    const id = posts.length ?(parseInt(posts[posts.length - 1].id) + 1).toString() :"1";
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
      navigate('/');
   } catch (error) {
      console.log(`Error: ${error.message}`);
  }
};*/

  return (
    <div className='App'>
      <DataProvider>
      <Header title="SAMPLE APP FOR POST"/>
      <Nav/>
      <Routes>

          <Route  path="/" element={<Home/>}/>

          <Route path="post">

            <Route  index element={ <NewPost/>}/>

        <Route  path=":id" element={<PostPage/>}/>

        </Route>

        <Route path="/edit/:id" element={<EditPost />}>
                </Route>

        <Route  path="about" element={<About />}/>
        <Route  path="*" element={<Missing />}/>
      </Routes>
    <Footer />
    </DataProvider>


    </div>
    
  )
}

export default App;
