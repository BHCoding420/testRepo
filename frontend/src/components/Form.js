import { TextField,Button,Typography,Grid,Card, CardContent,Slider,InputLabel,Select,OutlinedInput,MenuItem,Checkbox,ListItemText } from '@mui/material';
import React, { useEffect,useState } from 'react'; 
import FileBase from 'react-file-base64'; 
import './Form.css'; 
import axios, { Axios } from 'axios';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 

 
const Form = ({Posts,setPosts,setopenform,user}) => {  

    useEffect(() => {
    console.log(user)
        
    }, [user])
   

    const [PostData,setPostData] = useState({
        
        title:'',
        description:'', 
        Init_score:0,
        score: null,
        ReleaseDate: new Date(2018, 11, 24), 
        tags:[],
        Cast:'',
        reviews:[], 
        
        selectedImg:{}
    });  
    const [error, seterror] = useState('') 


    const submitPost = (e) => {
        e.preventDefault();  

        setimgsrc(''); 
        
        if(!error)
        {
            const Post = {
                creator: { creatorId : user._id , creatorName : user.name },
                title: PostData.title, 
                description: PostData.description, 
                Init_score: PostData.Init_score, 
                score: PostData.Init_score, 
                ReleaseDate: PostData.ReleaseDate, 
                tags: PostData.tags, 
                Cast: PostData.Cast.split('/'), 
                  
                LikedBy:[],
                SelectedImg: PostData.selectedImg.base64
            }
        
        
            setopenform(false);

            
            
            fetch('http://localhost:5000/movies/add', {
            method: "POST",
            body: JSON.stringify(Post),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => {response.json();console.log(response)}) 

            setPosts([...Posts,Post]);  
            
            
            }
    } 

    const modifyvalue = (e,element) => { 
        //console.log(e.target)
        setPostData({...PostData,[element] : e.target.value}) 
        //console.log(PostData[element]);
    } 

    
    
    
    const [imgsrc, setimgsrc] = useState('')

    const genres = ["Action","Adventure","Horror","Comedy","Drama","Mystery","Thriller","Cartoon","Anime","Hentai"] 

    
        
    return (
        <div>
            <Typography className="error">{error}</Typography> 
            {user ? <Grid>
                <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto",backgroundColor:"rgb(58, 52, 52)" }}>
                    <CardContent>
                        <form  onSubmit={submitPost}>
                            <Grid  container spacing={1}>
                                
                                <Grid xs={12} item>
                                    <TextField inputProps={{
                                        style: { color: 'yellow' }
                                      }} color="warning" onChange={(e) => (modifyvalue(e,'title'))} placeholder="Enter movie name" label="Name of movie" variant="outlined" fullWidth value={PostData.title} required />
                                 </Grid>
                                <Grid item xs={12}>
                                    <TextField inputProps={{
                                        style: { color: 'yellow' }
                                      }} color="warning" multiline rows={4} onChange={(e) => (modifyvalue(e,'description'))}  placeholder="add description" label="description" variant="outlined" value={PostData.description} fullWidth required />
                                </Grid>
                                <Grid item xs={12}> 
                                      <Typography color="warning" variant="h6" style={{textAlign: 'left'}}>Score:</Typography>
                                    <Slider color="warning"  defaultValue={50} aria-label="Default" valueLabelDisplay="auto" min={0}
                                    max={10} onChange={(e) => (modifyvalue(e,'Init_score'))}/>
                                    {/*<TextField  type="number" InputProps={{ inputProps: { min: 0, max: 10 } }}  placeholder="Enter score " label="score" variant="outlined" value={PostData.Init_score} fullWidth required />*/}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField inputProps={{
                                        style: { color: 'yellow' }
                                      }} color="warning" onChange={(e) => (modifyvalue(e,'ReleaseDate'))} InputLabelProps={{ shrink: true, required: true }} type="date" label="ReleaseDate" placeholder="ReleaseDate" variant="outlined" value={PostData.ReleaseDate} fullWidth required />
                                </Grid> 
                                <Grid xs={12} item> 
                                <InputLabel  id="demo-multiple-checkbox-label">Tag</InputLabel>
                                <Select
                                  fullWidth
                                  multiple
                                  value={PostData.tags}
                                  onChange={(e) => (modifyvalue(e,'tags'))}
                                  input={<OutlinedInput label="Tag" />}
                                  renderValue={(selected) => selected.join('/')}
                                  //MenuProps={MenuProps}
                                  
                                  
                                >
                                  {genres.map((name) => (
                                    <MenuItem key={name} value={name}>
                                      <Checkbox checked={PostData.tags.indexOf(name) > -1} />
                                      <ListItemText primary={name} />
                                    </MenuItem>
                                  ))}
                                </Select>
                                    {/*<TextField onChange={(e) => (modifyvalue(e,'tags'))} placeholder="Enter tags seperated by '/'" label="tags" variant="outlined" fullWidth value={PostData.tags} required />*/}
                                </Grid> 
                                <Grid xs={12} item>
                                    <TextField inputProps={{
                                        style: { color: 'yellow' }
                                      }} color="warning" onChange={(e) => (modifyvalue(e,'Cast'))} placeholder="Enter Cast" label="cast members" variant="outlined" fullWidth value={PostData.Cast} required />
                                 </Grid> 
                                 <Grid xs={12} item>
                                        <FileBase 
                                        type="file"
                                        accept="image/*"  
                                        imagePreview={true}
                                        multiple={false} 
                                        onDone={(Added_file) => {setPostData({...PostData,selectedImg: Added_file});setimgsrc(Added_file.base64)}}
                                        /> 
                                        { imgsrc && <img src={imgsrc}></img> }
                                 </Grid> 
                                 
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                                </Grid>
      
                            </Grid>
                         </form>
                    </CardContent>
                </Card>
            </Grid> : <p>Login</p> } 
            <Button onClick={() => setopenform(false)}>
                Close form
            </Button>
            
           
        </div>
    )
}

export default Form
