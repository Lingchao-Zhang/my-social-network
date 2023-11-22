import { FormFieldType } from "@/types"

const FormField = ({ title, state, isTextArea, setState}: FormFieldType) => {
    return(
        <div className="flexStart flex-col w-full gap-4">
            <label className="w-full text-gray-100">
                {title}
            </label>

            {
                isTextArea ? 
                <textarea 
                value={state}
                required
                className="form_field-input"
                onChange={(event) => setState(event.target.value)}
                />
                :
                <input 
                value={state}
                required
                className="form_field-input"
                onChange={(event) => setState(event.target.value)}
                />
            }
        </div>
    )
}

export default FormField