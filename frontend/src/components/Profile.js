import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/profile.css';

const Profile = () => {

    const { id } = useParams();
    const { authToken } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8888/app/home/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                console.log("Response", response);

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                setProfileData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id, authToken]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!profileData) return <div>Profile not found</div>;

    return (
        <div className="profile-page">

            <div className="profile-header">
                <img
                    src={profileData.picture}
                    alt={profileData.name}
                    className="profile-picture"
                />
                <h1>
                    {profileData.name}
                    {profileData.year ? " '" + profileData.year.toString().slice(-2) : ''}
                </h1>
                <div className="role-tags">
                    {profileData.des && <span className="role-tag des">DES</span>}
                    {profileData.dev && <span className="role-tag dev">DEV</span>}
                    {profileData.pm && <span className="role-tag pm">PM</span>}
                    {profileData.core && <span className="role-tag core">CORE</span>}
                    {profileData.mentor && <span className="role-tag mentor">MENTOR</span>}
                </div>
            </div>

            <div className="profile-content">
                <section className="profile-section">
                    <h2>{"About " + profileData.name.split(" ")[0]}</h2>
                    <p>{profileData.major ? "Major: " + profileData.major.toString(): ''}</p>
                    <p>{profileData.minor ? "Minor: " + profileData.minor.toString(): ''}</p>

                    <p>{"Hometown: " + profileData.home}</p>
                    <p>{"Birthday: " + profileData.birthday}</p>
                    <p>{"Quote: " + profileData.quote}</p>
                    <p>Favorite Things: </p>
                    <ul>
                        <li>{profileData["favorite thing 1"]}</li>
                        <li>{profileData["favorite thing 2"]}</li>
                        <li>{profileData["favorite thing 3"]}</li>
                        <li>{profileData["favorite dartmouth tradition"]}</li>

                    </ul>
                    <p>{"Fun fact: " + profileData["fun fact"]}</p>
                </section>

            </div>
        </div>
    );
};

export default Profile;