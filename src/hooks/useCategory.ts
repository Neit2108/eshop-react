import { fetchCategories } from "@/store/slices/categorySlice";
import { type AppDispatch, type RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"

export const useCategory = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        categories,
        isLoading,
        error
    } = useSelector((state: RootState) => state.categories);

    return {
        categories,
        isLoading,
        error,
        fetchCategories: (name: string) => {
            dispatch(fetchCategories(name));
        }
    }
}