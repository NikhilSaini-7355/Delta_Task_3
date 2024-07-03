
function PasswordInput({label,placeholder})
{
   return (
     <div className="textInputDiv flex flex-col space-y-2 w-full">
        <label for={label} className="font-semibold text-left">
            {label}
        </label>
        <input type='password' id={label} placeholder={placeholder} className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500" />
     </div>
   )
}

export default PasswordInput;