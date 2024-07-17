import React, { useState, useEffect } from 'react';
import { getContent, getProfile } from '../services/authService';
import './Membership.css';
const Membership = () => {
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = `Bearer ${localStorage.getItem('token')}`;
            const contentData = await getContent(token);
            const profileData = await getProfile(token);

            setArticles(contentData.articles);
            setVideos(contentData.videos);
            setProfile(profileData);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">

            <h1 className="mb-4">Hai {profile.user.email}</h1>

            <div className="row">
                <div className="col-lg-8">
                    <h2>Articles ({profile.max_content.maxArticles})</h2>
                    {articles.map(article => (
                        <div className="card mb-3" key={article.id}>
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">{article.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="row mt-4">
                <h2>Videos ({profile.max_content.maxVideos})</h2>
                {videos.map(video => (
                    <div className="col-lg-4" key={video.id}>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{video.title}</h5>
                                <div className="embed-responsive embed-responsive-16by9">
                                    <iframe className='embed-responsive-item' src={video.url} title={video.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Membership;
