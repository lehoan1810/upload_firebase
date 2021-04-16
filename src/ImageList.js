import {fb} from "./firebase/firebase";
import 'firebase/firestore';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from "react";

const useStyles = makeStyles({
    post:{
        padding: '10px',
        marginTop: '16px',
        marginBottom: '16px',
        backgroundColor: 'white'
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },    
    mybutton: {
        marginTop: '16px',
        borderRadius: '99vw',
        background: '#448aff',
        color: 'white'
    },
    toTopBtn: {
        borderRadius: '1000px',
        background: '',
        position: 'sticky',
        right: '1vw',
        bottom: '1vh'
    }
});

const db = fb.firestore()

const ImageList = (pros) => {
    
    const classes = useStyles();

    useEffect(() => { 
        db.collection('postsec')
            .orderBy("dateAdded","desc")
            .limit(10)
            .get()
            .then((collections)=> {
                pros.updateState(collections);
                console.log(collections)
            })
    },[])

    const fetchMore = () => {
        pros.setLoading(true);
        db.collection('postsec')
            .orderBy("dateAdded","desc")
            .startAfter(pros.lastDoc)
            .limit(10)
            .get()
            .then((collections) => {
                pros.updateState(collections)
            })
    }

    const toTop = event =>{        
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }
    return(
        <div id="image-list">
                {pros.posts.map(post => {
                  return <Paper  className={classes.post} elevation={3}>
                    <img width="100%" src={post.img}/>
                    <Typography>{post.text}</Typography>
                    </Paper>
                })}
                <div className={classes.center}>                    
                    {pros.loading && <CircularProgress />}
                    {!pros.isEmpty && !pros.loading && <Button className={classes.mybutton} onClick={fetchMore}>More</Button>}
                    {pros.isEmpty && <Typography>No</Typography>}
                </div>
        </div>
    )
}

export default ImageList
