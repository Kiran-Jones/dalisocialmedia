import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useAuth();

    const [filters, setFilters] = useState({
        des: false,
        dev: false,
        pm: false,
        core: false,
        mentor: false
    });

    const getQueryString = () => {
        const activeFilters = Object.entries(filters)
            .filter(([_, value]) => value)
            .map(([key, _]) => `${key}=true`);
        return activeFilters.length ? `?${activeFilters.join('&')}` : '';
    };

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            try {
                const queryString = getQueryString();
                const response = await fetch(`http://localhost:8888/app/home${queryString}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch members');
                }

                const data = await response.json();
                setMembers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [authToken, filters]);


    const handleFilterChange = (filterName) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    const FilterSection = () => (
        <div className="filter-section">
            <h3>Filter by Role</h3>
            <div className="filter-options">
                {Object.entries(filters).map(([key, value]) => (
                    <label key={key} className="filter-option">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handleFilterChange(key)}
                        />
                        {key.toUpperCase()}
                    </label>
                ))}
            </div>
        </div>
    );

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="home-container">
            <h1>Members</h1>

            <FilterSection />

            <div className="profile-grid">
                {members.map((member, index) => (
                    <Link
                        to={`/home/${member.id}`}
                        key={index}
                        className="profile-card-link"
                    >
                        <div className="profile-card">
                            <div className="profile-image">
                                <img src={member.picture} alt={member.name} />
                            </div>
                            <div className="profile-info">
                                <h2>
                                    {member.name}
                                    {member.year ? " '" + member.year.toString().slice(-2) : ''}
                                </h2>
                                <div className="role-tags">
                                    {member.des && <span className="role-tag des">DES</span>}
                                    {member.dev && <span className="role-tag dev">DEV</span>}
                                    {member.pm && <span className="role-tag pm">PM</span>}
                                    {member.core && <span className="role-tag core">CORE</span>}
                                    {member.mentor && <span className="role-tag mentor">MENTOR</span>}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;