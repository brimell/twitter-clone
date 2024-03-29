import React, { useState } from 'react';
import './styles.css';
import { Avatar, Button } from '@material-ui/core';
import db from '../../firebase';

export default function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState('');
  const sendTweet = (e) => {
    e.preventDefault();

    db.collection('users')
      .get()
      .then((querySnapshot) => {
        var usersdb = querySnapshot.docs.map((doc) => doc.data())[0];
        db.collection('posts').add({
          displayName: usersdb.display_name,
          username: usersdb.username,
          verified: usersdb.verified,
          text: tweetMessage,
          image: tweetImage,
          avatar: usersdb.avatar,
        });
      });

    setTweetMessage('');
    setTweetImage('');
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}
