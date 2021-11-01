
import '../App.css'; 
import Form from './Form';
import {Button,TextField, Typography,FormControl,Input,InputLabel,InputAdornment,Popover} from '@mui/material';

import { useEffect,useState } from 'react';
import axios from 'axios';  

import Posts_Container from './Posts_Container'; 
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';  
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { getCurrentUser } from "../services/authService"; 

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; 
import { logout } from "../services/authService";
import { Link} from "react-router-dom";




function Main() 
{ 
  const [Posts, setPosts] = useState(null)  
  const [reviews, setreviews] = useState(null)
  const [searchfield, setsearchfield] = useState("") 

  const [user, setUser] = useState("");
  const [OgPosts, setOgPosts] = useState([]) 
    
  useEffect(() =>{ 

    setUser(getCurrentUser());  
    
    
    axios.get('http://localhost:5000/movies')
    .then((response) => { 
      
      
      
      
      setOgPosts(response.data)
      setPosts(response.data);  



      
    }).catch(err => console.log("gett error " + err));  

    axios.get('http://localhost:5000/reviews')
    .then((response) => { 
      
      
      
      
      
      setreviews(response.data);  



      
    }).catch(err => console.log("gett error " + err)); 
    //console.log(reviews);
    
  }, [])
  
  

  const PostsJson = JSON.stringify(Posts);

  const [openform, setopenform] = useState(false)   

  //buttpn popover shit
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined; 

  return (
    <div className="App"> 
      
      <AppBar position="sticky" style={{backgroundColor:" rgb(58, 52, 52)",width:"100%",color:"goldenrod" }} >
          <Toolbar variant="dense"> 
            <div style={{ flexGrow: 1,textAlign:"left",display: "flex" }} >
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}  >
                <MenuIcon />
              </IconButton>
              <Typography className="movieTop" variant="h4" color="inherit" component="div" >
                Movies
              </Typography>
            </div>
             
            {user ?
            <div style={{display:"flex"}}>
              {/*<Typography  variant="h6" color="inherit" component="div">
              {user.name}
            </Typography>*/} 
              <Button onClick={logout}>  <p>Logout</p> </Button>  
              <Button aria-describedby={id}  onClick={handleClick}>
                <AccountCircleIcon style={{ color:"goldenrod"}} />  
                
              </Button> 
              <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Typography sx={{ p: 2}} style={{backgroundColor:"rgb(58, 52, 52)"}}>{user.name}</Typography>
              </Popover>
            </div>
            : 
            <div>
              <Button> <Link to="/signup" style={{textDecoration: "none"}}> <p>Signup</p> </Link> </Button> 
              <Button> <Link to="/login" style={{textDecoration: "none"}}> <p>Login</p> </Link> </Button>
            
            </div>
          }
          </Toolbar>
      </AppBar>
     
       

        
      {/*user && <h1>{ user._id} <br/> {user.name}</h1>&*/} 
      
      <Button onClick={() =>{setopenform(true)}}>
        {!openform && <p><AddIcon/> Add a new movie</p>}
      </Button>
      {openform && <Form Posts={Posts} setPosts={setPosts} setopenform={setopenform} user={user}/>}  
      <div > 

        <FormControl variant="standard" >
          <InputLabel >
            search movies
          </InputLabel>
          <Input
            fullWidth
            onChange={(e) => setsearchfield(e.target.value)} 
            style={{color:"white",backgroundColor: "rgb(58, 52, 52)",marginBottom:"1rem"}}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon style={{color:"white"}} />
              </InputAdornment>
            }
          />
        </FormControl>
        
      </div>
      
      {Posts ? <Posts_Container Posts={!searchfield ? Posts : Posts.filter(post => post.title.toUpperCase().includes(searchfield.toUpperCase()))} setPosts={setPosts} user={user} reviews={reviews} setreviews={setreviews} OgPosts={OgPosts} /> : <CircularProgress size={125} style={{padding: "100px"}}/>}

      
    </div> 
  );
}

export default Main;
