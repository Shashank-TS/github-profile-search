import React, { useState } from "react";
import "./GithubSearch.css";
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import { PiBuildingsFill } from 'react-icons/pi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';

const GithubSearch = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("User not found or error fetching data");
      }

      const data = await response.json();
      console.log(data);
      setProfile(data);
      setError("");

    } catch (error) {
      console.error(error);
      setError("User not found");
      setProfile('')
    }

  };
  return (
    <div className="main-container">
      <h1 className="main-heading">Github Profile Search</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter Github Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="search-input"
        ></input>
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
      {
        error && <p className="error-msg">{error}</p>
      }
      {profile && (
        <div className='profile-container'>
            <div className='profile-content'>
                <div className='profile-img'>
                    <img src={profile.avatar_url} alt='Avatar' className='profile-avatar'></img>
                </div>
                <div className='profile-details'>

                    <div className='profile-des'>
                        <h2 className='profile-name'>{profile.name}</h2>
                        <p className='profile-created'>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
                    </div>

                    <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-username'>@{profile.login}</a>
                    <p className='profile-bio'>{profile.bio}</p>

                    <div className='profile-stats'>
                        <p className='profile-repos'>Repositories<br/><span className='stats'>{profile.public_repos}</span></p>
                        <p className='profile-followers'>Followers<br/><span className='stats'>{profile.followers}</span></p>
                        <p className='profile-following'>Following<br/><span className='stats'>{profile.following}</span></p>
                    </div>

                    <div className='profile-info'>
                        <p className='profile-location'><FaMapMarkerAlt/> {profile.location}</p>
                        <p className='profile-company'><PiBuildingsFill/> {profile.company}</p>
                    </div>

                    <div className='profile-links'>
                        <a href={`https://twitter.com/${profile.twitter_username}`} target='_blank' rel="noreferrer" className='twitter-link'><FaXTwitter/>{profile.twitter_username}</a>
                        <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-url'><FaGithub/>View Profile</a>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default GithubSearch;
