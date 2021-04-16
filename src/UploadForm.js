import {storage, fb} from "./firebase/firebase";
import React, { useState, useEffect,useRef } from "react";
import Button from '@material-ui/core/Button';
import 'firebase/firestore';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import LinearProgress from '@material-ui/core/LinearProgress';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({    
    form:{
        padding: '32px',
        marginTop: '16px',
        marginBottom: '16px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    post:{
        padding: '10px',
        marginTop: '16px',
        marginBottom: '16px',
        backgroundColor: 'white',
    },
    center:{
        display: 'flex',
        justifyContent: 'center',
    },
    mybutton: {
        marginTop: '16px',
        borderRadius: '99vw',
        background: '#448aff',
        color: 'white'
    },
    preview: {
        marginTop: '16px',
        maxHeight: '70vh',
    },
    root: {
        background: 'linear-gradient(45deg, #448aff 30%, #448aff 90%)',
        border: 0,  
        color: 'white',
        height: 30,
        padding: '0 30px',
        marginTop: '16px',
    },
    // paper: {
    //     position: 'fixed',
    //     top: '0vh',
    //     right: '10vw'
    // }
});

const db = fb.firestore()

const UploadForm = (props) => {
    
    const classes = useStyles();
    const [url, setURL] = useState(null);
    const [enabled, setEnabled] = useState(false);
    const [progress, setProgress] = useState(false);
    const [open, setOpen] = React.useState(false);

    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleChange= async (e) => {
        setProgress(true)
        const file = e.target.files[0]
        const storageRef = fb.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setURL(await fileRef.getDownloadURL())        
        if(url == ''){
            setEnabled(false)
        } else {
            setEnabled(true)
            setProgress(false)
        }
        console.log('done')
    }
    const scrollTop = () =>{
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    }
  function handleUpload(e) {
    e.preventDefault();
    const text = e.target.text.value
    if(!text){
      alert("Chưa nhập caption")
      return;
    }   
    if(url == ''){
        setEnabled(false)
        return;
    } else {
        setEnabled(true)
    }
    const date = Date.now()
    const newPost = {        
      text: text,
      img: url,
      dateAdded: date
    }
    db.collection("posts").add(newPost);
    props.addNewPost(newPost);
    document.getElementById('upload-form').reset();
    setURL(null);
    return false;
  }
    const handleUploadClick = event => {      
        document.getElementById('uploadbtn').click();
    }
    const handleChooseClick = event => {      
        document.getElementById('choosebtn').click();
    }

    return(
        <div className={classes.paper}>
            <Paper elevation={3} className={classes.form}>                
                <form id="upload-form" onSubmit={handleUpload} className={classes.center} width='100%'>
                <FormControl >
                    <InputLabel width="100%">Caption</InputLabel>
                    <Input id="caption" type="text" name="text"/>                 
                </FormControl>
                <input type="file" name="upload"
                    id="choosebtn"
                    accept="image/*"
                    style={{display:'none'}} 
                    onChange={handleChange}/>
                <Input type="submit" 
                    id="uploadbtn"
                    style={{display:'none'}} />
                </form>      
                <Button onClick={handleChooseClick} className={classes.root}><AddPhotoAlternateIcon/></Button>
                <Button onClick={handleUploadClick} disabled={!enabled} className={classes.root}>Upload</Button>
                {progress && <LinearProgress progress={progress} style={{marginTop: '16px'}}/>}
                <img id="preview-image" width="100%" className={classes.preview} src={url} alt="" />
            </Paper>
        </div>
    )
}

export default UploadForm