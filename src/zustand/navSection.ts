import { create } from "zustand"

interface INavsection {
    navOpen: boolean
    actions: {
        onOpenNavSection: (payload: boolean) => void
    }
}

const useNavSection = create<INavsection>((set) => ({
    navOpen: true,
    actions: {
        onOpenNavSection: async (payload: boolean) => {
            set({
                navOpen: payload
            })
        },
    }

}))

export const useNavSectionStates = () => {
    const { navOpen } = useNavSection(state => ({
        navOpen: state.navOpen
    }))

    return {
        navOpen
    }
}
export const useNavSectionActions = () => useNavSection(state => state.actions)