import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import fs from 'fs';
// const os = require('os');

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {//
    height: 790,
  },
});

export default function TarotCard({jpegs}) {
  const classes = useStyles();

  jpegs = shuffle(jpegs)
  useEffect(() => {
    // Always do navigations after the first render
    jpegs = shuffle(jpegs);
    setFilePath('tarot_images/' + jpegs[0]);
  })
  const [filePath, setFilePath] = useState('tarot_images/' + jpegs[0]);
  const handleClick = () => {
    jpegs = shuffle(jpegs);
    setFilePath('tarot_images/' + jpegs[0]);
  };

  function shuffle(array) {
    for (var i = 0; i < array.length; i++) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

  return (
    <Container maxWidth="sm">
      {handleClick}
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={filePath}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Random Tarot Card
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This is a random tarot card.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={handleClick}>
                Draw another
              </Button>
            </CardActions>
          </Card>
    </Container>
  );
}

export async function getStaticProps(isServer) {
  var fs;
  if(isServer){
   fs=require('fs');
   var jpegs = [];
   var files = fs.readdirSync('public/tarot_images');
   
   for (var file of files) {
     if (file.endsWith(".jpg")) {
       jpegs.push(file);
      }
    }
    for (var i = 0; i < jpegs.length; i++) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = jpegs[i];
      jpegs[i] = jpegs[j];
      jpegs[j] = temp;
  }
    return {
      props : {jpegs: jpegs} // will be passed to the page component as props
    }
  }
}