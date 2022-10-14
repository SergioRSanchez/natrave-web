import { useLocalStorage }  from 'react-use'
import { Navigate } from 'react-router-dom'

export function Home() {
  const [auth] = useLocalStorage('auth', {})

  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true}/>
  }

  return (
    
    <div className='h-auto md:h-screen bg-red-700 text-white flex flex-col items-center p-4 space-y-6'> 

      <header className='container max-w-5xl p-4 flex justify-center'>
        <img className='w-40' src="/imgs/logo-fundo-vinho.svg" alt="logo com o escrito 'na trave'"/>
      </header>
    
      <div className='container max-w-5xl p-4 flex-1 bg-red-700 flex flex-col items-center md:flex-row space-y-6 md:space-y-0 md:space-x-6'>

        <div className='md:flex-1 flex justify-center'>
          <img className='w-full' src="/imgs/photo.png" alt="foto de um mulher com traços orientais vestindo a camisa amarela da selação brasileira, e um homem negro vestindo a camisa azul da seleção brasileira" />
        </div>

        <div className='md:flex-1 bg-red-700 text-white flex flex-col space-y-6'>
          <h1 className='text-3xl text-center font-bold md:text-start'>Dê o seu palpite na Copa do Mundo do Catar 2022!</h1>

          <a href='/signup' className='text-center text-red-700 bg-white px-8 py-4 text-xl rounded-xl'>
            Criar minha conta
          </a>

          <a href='/login' className='text-center border border-white px-8 py-4 text-xl rounded-xl'>
            Fazer login
          </a>
        </div>

      </div>

    </div>

  )
}