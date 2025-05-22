import React, { useState } from 'react';

const App: React.FC = () => {
    const [username, setUsername] = useState('');
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const urlGithub = `https://api.github.com/users`;
    
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setRepos([]);
        try {
            const res = await fetch(`${urlGithub}/${username}/repos`);
            if (!res.ok) throw new Error('Usuário não encontrado ou erro na API');
            const data = await res.json();
            setRepos(data);
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };

    const exportCSV = () => {
        if (!repos.length) return;
        const header = ['Nome', 'Descrição', 'Estrelas', 'URL'];
        const rows = repos.map(repo => [
            repo.name,
            repo.description || '',
            repo.stargazers_count,
            repo.html_url
        ]);
        const csvContent =
            [header, ...rows]
                .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
                .join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${username}_repos.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
            <h2>Pesquisar Usuário do GitHub</h2>
            <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Digite o nome do usuário"
                    required
                    style={{ padding: 8, width: '70%' }}
                />
                <button type="submit" style={{ padding: 8, marginLeft: 8 }}>Buscar</button>
            </form>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {repos.length > 0 && (
                <div>
                    <h3>Repositórios de {username}</h3>
                    <button onClick={exportCSV} style={{ marginBottom: 10 }}>Exportar CSV</button>
                    <ul>
                        {repos.map(repo => (
                            <li key={repo.id}>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.name}
                                </a> - ⭐ {repo.stargazers_count}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;