
function EditFormButton({handleHideEditForm}) {
    return(
        <button class="block w-32 md:w-48 lg:w-56 mx-1 py-2.5 rounded-md bg-slate-900  text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950" onClick={handleHideEditForm}>Edit User</button>
    )
}

export default EditFormButton