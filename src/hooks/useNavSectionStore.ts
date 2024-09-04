import { useNavSectionActions, useNavSectionStates } from "@/zustand/navSection"

export const useNavSectionStore = () => {
   
    const { navOpen } = useNavSectionStates()
    const { onOpenNavSection } = useNavSectionActions()

    const openNavSection = (boolean: boolean) => {
        onOpenNavSection(boolean)
    }

    return {
        //states
        navOpen,
        //actions
        openNavSection
    }
}