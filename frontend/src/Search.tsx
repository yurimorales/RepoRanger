import React, { useState } from 'react';
import './App.css';

const Search: React.FC = () => {
    const [username, setUsername] = useState('');
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const urlGithub = `https://api.github.com/users`;

    const handleSearch = async () => {
        if (!username) return;

        setLoading(true);
        try {
            const response = await fetch(`${urlGithub}/${username}/repos`);
            const data = await response.json();
            setRepos(data);
        } catch (error) {
            console.error('Error fetching repositories:', error);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + repos.map(repo => `${repo.name},${repo.html_url}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${username}_repos.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <h2>Search GitHub User</h2>
            <div className="search-form">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button className="search-btn" onClick={handleSearch} disabled={loading}>
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </div>
            {repos.length > 0 && (
                <div>
                    <h3>Repositories:</h3>
                    <ul>
                        {repos.map(repo => (
                            <li key={repo.id}>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button className="export-btn" onClick={exportToCSV}>
                        Export to CSV
                    </button>
                </div>
            )}
        </div>
    );
};

export default Search;