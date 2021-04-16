import React, { useState } from "react";
import 'firebase/firestore';
import Grid from '@material-ui/core/Grid';
import ImageList from './ImageList';
import UploadForm from './UploadForm';
import ToTop from './ToTop';
import Slide from './Slide';

const App = () => {

  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false)
  const [loading, setLoading] = useState(false)


    const updateState = (collections) => {
      if(!(collections.size === 0)) {
          const p = collections.docs.map((post)=>post.data());
          const lastDoc = collections.docs[collections.docs.length - 1];
          setPosts(posts => [...posts,...p]);
          setLastDoc(lastDoc);
          setIsEmpty(false);
          setLoading(false);
      } else {
          setIsEmpty(true);
          setLoading(false);
      }
  }
  const addNewPost = (post) => {    
    setPosts(posts => [post,...posts]);
  }
    return (
      <div className="App" style={{backgroundColor: '#e3f2fd', minHeight: '100vh'}}> 
        <ToTop />
        <Slide updateState={updateState}          
                posts={posts}/>
        <Grid container justify="space-between" > 
          <Grid item lg={2} />
          <Grid item lg={4} md={3}>
              <UploadForm addNewPost={addNewPost}/>
              <ImageList updateState = {updateState} 
                lastDoc={lastDoc}
                isEmpty={isEmpty}
                loading={loading}
                posts={posts}
                setLoading={setLoading}/>
          </Grid>
          <Grid item lg={2}>
          </Grid>   
        </Grid>          
      </div>
    );
}

export default App;
