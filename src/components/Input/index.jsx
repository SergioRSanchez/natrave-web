export const Input = ({ name, label, error, ...props }) => (
  <div className='flex flex-col'>
    <label className='text-sm text-gray-500 font-bold mb-2' htmlFor={name}>{label}</label>
    <input {...props} name={name} id={name} className={`p-3 border border-gray-700 rounded-xl focus:outline focus:outline-1 focus:outline-gray-700 ${error && 'border-red-300'}`}/>
    <span className='p-2 text-sm text-red-300'>{error}</span>
  </div>
)