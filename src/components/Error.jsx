const Error = (props) => {
  return (
    <div className="bg-red-800 text-center text-white p-3 uppercase font-bold mb-3 rounded-md">
        {props.children}
    </div>
  )
}

export default Error