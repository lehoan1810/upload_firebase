import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Slide.css';
import { useState, useEffect } from "react";
import { fb } from "./firebase/firebase";

const db = fb.firestore()

const Slideshow = (props) => {
    useEffect(() => { 
        db.collection('postsec')
            .orderBy("dateAdded","desc")
            .limit(10)
            .get()
            .then((collections)=> {
                props.updateState(collections);
            })
    }, [])
    
    return (
        <Carousel fade className="slide"
            interval = {3000}
            style={{ height: '50vh', background: '#000', overflow: 'hidden'}}>
            {props.posts.map(post => {
                return <Carousel.Item className='h-100'>
                    <img
                        className="d-block m-auto h-100"
                        src={post.img}
                        alt="First slide"
                    >
                    </img>
                    <Carousel.Caption>
                        <h3 style={{background: 'rgba(0,0,0,0.45)'}}>{post.text}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            })}
            </Carousel>
    )
}
export default Slideshow;
