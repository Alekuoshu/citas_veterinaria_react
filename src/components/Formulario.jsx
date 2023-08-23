import { useState, useEffect } from "react"
import Error from "./Error"

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintoma, setSintoma] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if( Object.keys(paciente).length > 0 ){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintoma(paciente.sintoma)
    }
  }, [paciente])

  const generateId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()

    // validando fields
    if([nombre, propietario, email, fecha, sintoma].includes('')) {
      
      setError(true)
      
    }else{

      setError(false)

      const objetoPaciente = {
        nombre, 
        propietario, 
        email, 
        fecha, 
        sintoma
      }


      if(paciente.id){
        // edicion
        objetoPaciente.id = paciente.id
        const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

        setPacientes(pacientesActualizados)
        setPaciente({})
        
      }else{
        // nuevo
        objetoPaciente.id = generateId()
        setPacientes([...pacientes, objetoPaciente])
      }
  
  
  
      // Reiniciando formulario
      setNombre('')
      setPropietario('')
      setEmail('')
      setFecha('')
      setSintoma('')

    }


  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-2 mb-10 text-center">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5" onSubmit={handleSubmit}>

        { error && <Error><p>Todos los campos son obligatorios</p></Error> }
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>

          <input 
            id="mascota"
            type="text" 
            placeholder="Nombre de la Mascota" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre} 
            onChange={ (e) => setNombre(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>

          <input 
            id="propietario"
            type="text" 
            placeholder="Nombre del Propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={propietario} 
            onChange={ (e) => setPropietario(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>

          <input 
            id="email"
            type="email" 
            placeholder="Email Contacto Propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={email} 
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>

          <input 
            id="alta"
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={fecha} 
            onChange={ (e) => setFecha(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>

          <textarea 
            id="sintomas"
            placeholder="Describe los Síntomas" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={sintoma} 
            onChange={ (e) => setSintoma(e.target.value) }
          />
        </div>

        <button 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors text-center"
        >{paciente.id ? 'Editar' : 'Agregar'} Paciente</button>

      </form>
    </div>
  )
}

export default Formulario