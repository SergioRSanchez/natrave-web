import { useState, useEffect } from 'react'
import { useLocalStorage, useAsyncFn } from 'react-use'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { format, formatISO } from 'date-fns'

import { Icon, Card, DateSelect } from '~/components'

export const Dashboard = () => {
    const params = useParams()

    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))

    const [auth] = useLocalStorage('auth', {})

    const [{ value: user, loading, error}, fetchHunches] = useAsyncFn(async () => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${auth.user.username}`,
        })

        const hunches = res.data.hunches.reduce((acc, hunch) => {
            acc[hunch.gameId]= hunch
            return acc
        }, {})

        return {
            ...res.data,
            hunches
        }
    })

    const [games, fetchGames] = useAsyncFn(async (params) => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/games',
            params
        })
        return res.data
    })

    const isLoading = games.loading || loading
    const hasError = games.error || error
    const isDone = !isLoading && !hasError

    useEffect(() => {
        fetchHunches()
    }, [])

    useEffect(() => {
        fetchGames({ gameTime: currentDate })
    }, [currentDate])

    if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <>
            <header className='bg-red-500 text-white p-4'>

                <div className='container max-w-3xl flex justify-between'>
                    <img className='w-28 md:w-40' src="/imgs/logo-fundo-vermelho.svg" alt="logo com o escrito 'na trave'"/>
                    <a href={`/${auth?.user?.username}`}>
                        <Icon className='w-8' name='profile' />
                    </a>
                </div>

            </header>

            <main className='space-y-6'>
                <section id='header' className='bg-red-500 text-white'>

                    <div className='container max-w-3xl space-y-2 p-4'>
                        <span className=''>Olá {auth?.user?.name}</span>
                        <h3 className='text-2xl font-bold'>Qual é o seu palpite</h3>
                    </div>

                </section>

                <section id="content" className='p-4 container max-w-3xl space-y-4'>
                    <DateSelect currentDate={currentDate} onChange={setDate} />

                    <div className='space-y-4'>
                        {isLoading && 'Carregando jogos...'}
                        {hasError && 'Ops! Ago deu errado.'}
                        
                        {isDone && games.value?.map(game => (
                            <Card
                                key={ game.id }
                                gameId={ game.id }
                                homeTeam={ game.homeTeam }
                                awayTeam={ game.awayTeam }
                                gameTime={ format(new Date(game.gameTime), 'H:mm')}
                                homeTeamScore={user?.hunches?.[game.id]?.homeTeamScore || ''}
                                awayTeamScore={user?.hunches?.[game.id]?.awayTeamScore || ''}
                            />
                        ))}

                    </div>
                </section>
            </main>

        </>
)}