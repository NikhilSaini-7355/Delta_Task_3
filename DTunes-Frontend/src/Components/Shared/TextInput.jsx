
function TextInput({label,placeholder,className,value,setValue,labelClassName})
{
   return (
     <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
        <label id={label} 
         //   for={label}
        className={`font-semibold text-left ${labelClassName}`}>
            {label}
        </label>
        <input type='text' id={label} placeholder={placeholder} value={value} onChange={(e)=>{ setValue(e.target.value)}} className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500" />
     </div>
   )
}

export default TextInput;