import { addDays, subDays, format, formatISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Icon } from '~/components/Icon'

export const DateSelect = ({ currentDate, onChange }) => {
    const date = new Date(currentDate)
    const prevDay = () => {
        const prevDate =subDays(date, 1)
        onChange(formatISO(prevDate))
    }
    const nextDay = () => {
        const nextDate =addDays(date, 1)
        onChange(formatISO(nextDate))
    }

    return (
        <div className='text-red-300 flex items-center justify-center space-x-4 p-4'>
            <Icon className='w-8' name='arrowLeft' onClick={prevDay}/>
            <span className='font-bold text-xl text-red-700'>{format(date,"d 'de' MMMM", { locale: ptBR })}</span>
            <Icon className='w-8' name='arrowRight' onClick={nextDay}/>
        </div>
  )
}