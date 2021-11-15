import apiService from "../../../services/server"
import { useDispatch } from 'react-redux'
import { Confirm } from "../../Alert/Alert"
import { deleteCategory } from "../../../features/slices/categoriesSlice"
import { deleteNovelty } from "../../../features/slices/noveltySlice"

export const HandleDeleteCategory = async (id) => {
    const dispatch = useDispatch()
    const alertResult = await Confirm("Eliminar categoria", "Esta intentando eliminar una categoria, ¿desea continuar?")
    if (alertResult) {
        const deleteResult = await apiService.delete("/categories", { id })
        if (deleteResult.data.message === "¡Category deleted successfully!") {
            dispatch(deleteCategory(id))
        }
    }
}
