import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css'
function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
         
        async function loadFilmes (params) {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: '1a928b23a0f6224b24e8fff82df98dec',
                    language: 'pt-BR',
                    page: 1,
                },
            })
            // console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,10));
            setLoading(false);
        }
        loadFilmes();

        return () => {
            console.log('Componente Desmontado');
        }
    }, []);

    if (loading){
        return(
            <div className='loading'>
                <h2> Carregando filmes ...</h2>
            </div>
        );
    }

    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;