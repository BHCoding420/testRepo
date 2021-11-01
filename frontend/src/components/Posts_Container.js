import React,{useEffect,useState} from 'react'
import {Button,TextField, Typography,FormControl,Input,InputLabel,InputAdornment,Popover,Grid,Card,CardContent} from '@mui/material';

import Post from './Post/Post'; 
import './Post_Container.css' 
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SortBy from './SortBy';



const Posts_Container = ({Posts,setPosts,user,reviews,setreviews,OgPosts}) => { 

    
    
    const [isAscending,setisAscending] = useState(true);

    const Delete_Item = async (id_to_be_deleted) => {
        setPosts(Posts.filter((post) => {return post._id !== id_to_be_deleted})); 
        //console.log(Posts.filter((post) => {return post !== post_to_be_deleted} )) 
        await axios.delete('http://localhost:5000/movies/' + id_to_be_deleted)
        .then((deleted) => console.log(JSON.stringify(deleted))) 

        // WHY THE HELL DIDN'T IT DELETE THE FIRST TIME???


    }  

    const filter_reviews = (reviews,post_id) => {
        reviews = reviews.filter((review) => {return review.movie_id === post_id}) 
        return reviews;
    } 

    const [sortValue, setsortValue] = useState("NbOfLikes")

    const [searchfield, setsearchfield] = useState("") 

    
    

    
    return (
        <div>
            <Grid>
                <Card className="poster-color" style={{ maxWidth: 850, margin: "0 auto" }}>
                    <CardContent className="poster-color" >
                            <div style={{display: 'flex',justifyContent: 'space-between',backgroundColor:'rgb(71, 64, 64)',paddingTop:"1rem"}}>
                                <div style={{display: 'flex'}}>
                                    <SortBy sortValue={sortValue} setsortValue={setsortValue} />
                                    <Button onClick={() => setisAscending(!isAscending)}>
                                        {isAscending ? <i class="fas fa-sort-amount-down-alt fa-2x"></i> : <i class="fas fa-sort-amount-up fa-2x"></i> }
                                    </Button>  
                                   
                                </div>
                             

                             <FormControl variant="standard" >
                                
                                <InputLabel >
                                    search movies
                                </InputLabel>
                                <Input
                                    fullWidth
                                    onChange={(e) => setsearchfield(e.target.value)} 
                                    style={{color:"white",backgroundColor: "rgb(58, 52, 52)",marginBottom:"1rem",borderRadius:"25px"}} 
                                    
                                    startAdornment={
                                    <InputAdornment position="start">
                                        <Button onClick={() =>{setPosts(Posts.filter(post => post.title.toUpperCase().includes(searchfield.toUpperCase())))}}>
                                            <SearchIcon style={{color:"white"}} /> 
                                        </Button>
                                    </InputAdornment>
                                    }
                                /> 
                                
                            </FormControl>

                            </div>
                            
                            
                            {isAscending ? setPosts( Posts.sort((a, b) => (a[sortValue] > b[sortValue]) ? 1 : -1) ) : setPosts( Posts.sort((a, b) => (a[sortValue] < b[sortValue]) ? 1 : -1) )}  
                            
                            {!searchfield && setPosts(OgPosts)}
                            
                            {Posts.map((post) => (
                            <div className="poster-color" style={{marginBottom: '2rem'}} key={post._id}>
                                
                                <Post  key={post._id} post={post} Posts={Posts} setPosts={setPosts} user={user} reviews={filter_reviews(reviews,post._id)} setreviews={setreviews}/>  
                                <Button style={{display:'flex'}} onClick={() => Delete_Item(post._id)}>
                                <DeleteIcon style={{fontSize:'5rem',borderStyle:"solid",borderRadius:"10%",color:"rgb(118, 118, 118)"}} />
                                </Button> 
                                
                            </div> 
                            
                            
                            
                               
                            ))}   
                            
                            
                            {/*JSON.stringify(Posts)*/}
                        
                        
                    </CardContent> 

                </Card> 
                
            </Grid>
        </div>
    )
}

export default Posts_Container
