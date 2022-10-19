import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
  homeTeamScore: yup.string().required(),
  awayTeamScore: yup.string().required()
})

export const Card = ({ disabled, gameId, homeTeam, awayTeam, homeTeamScore, awayTeamScore ,gameTime }) => {
  const [auth] = useLocalStorage('auth')

  const formik = useFormik({
    onSubmit: (values) => {
      axios({
        method: 'post',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/hunches',
        headers: {
          authorization: `Bearer ${auth.accessToken}`
        },
        data: {
          ...values,
          gameId
        }
      })
    },
    initialValues: {
      homeTeamScore,
      awayTeamScore,
    },
    validationSchema
  })

  return (
    <div className='border border-gray-300 rounded-xl p-4 text-center space-y-3'>
                        
        <span className='text-sm md:text-base text-gray-700 font-bold'>{gameTime}</span>

        <form className='flex space-x-3 md:space-x-4 justify-center items-center'>
            <span className='uppercase text-xs md:text-base'>{homeTeam}</span>
            <img className='' src={`/imgs/flags/${homeTeam}.png`} alt={`bandeira de ${homeTeam}`} />

            <input 
              max={10} 
              min={0} 
              placeholder='' 
              type="number" 
              className='bg-red-300/[.2]  w-[55px] h-[55px] text-red-700 text-xl text-center'
              name="homeTeamScore"
              value={formik.values.homeTeamScore}
              onChange={formik.handleChange}
              onBlur={formik.handleSubmit}
              disabled={disabled}
            />

            <span className='text-red-500  font-bold'>X</span>

            <input 
              max={10} 
              min={0} 
              placeholder=''
              type="number" 
              className='bg-red-300/[.2] w-[55px] h-[55px] text-red-700 text-xl text-center'
              name="awayTeamScore"
              value={formik.values.awayTeamScore}
              onChange={formik.handleChange}
              onBlur={formik.handleSubmit}
              disabled={disabled}
            />
            
            <img className='' src={`/imgs/flags/${awayTeam}.png`} alt={`bandeira de ${awayTeam}`} />
            <span className='uppercase text-xs md:text-base'>{awayTeam}</span>
        </form>

    </div>
  )
}