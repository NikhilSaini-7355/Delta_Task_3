
function PasswordInput({label,placeholder,value,setValue})
{
   return (
     <div className="textInputDiv flex flex-col space-y-2 w-full">
        <label for={label} className="font-semibold text-left">
            {label}
        </label>
        <input type='password' id={label} placeholder={placeholder} value={value} onChange={(e)=>{ setValue(e.target.value)}}  className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500" />
     </div>
   )
}

export default PasswordInput;