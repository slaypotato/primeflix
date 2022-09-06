import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './filme-info.css';
function Filme() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [filme, setFilme] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme(params) {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '1a928b23a0f6224b24e8fff82df98dec',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log('Filme não encontrado');
                navigate('/',{ replace: true });
                return;
            })
        }
        loadFilme();
        return () => {
            console.log('Componente desmontado');
        }
    }, [navigate, id]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn('Filme já foi adicionado a lista');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Filme Salvo com Sucesso!!!');
    }

    if (loading){
        return(
            <div className='loading'>
                <h2> Carregando filmes ...</h2>
            </div>
        );
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong> Avaliação: {filme.vote_average} /10 </strong>
            <div className='area-button'>
                <button onClick={salvarFilme}>Salvar</button>
                <button><a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>
            </div>
        </div>
    );
}

export default Filme;