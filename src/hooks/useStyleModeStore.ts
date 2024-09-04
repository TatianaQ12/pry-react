import { useStylesModeActions, useStylesModeStyle } from "@/zustand/stylesMode";

export const useStyleModeStore = () => {

    const modeStyle = useStylesModeStyle();
    const { onSetModeStyle } = useStylesModeActions();

    const setModeStyle = (mode: string) => {
        console.log('mode', mode)
        onSetModeStyle(mode)
    }

    return {
        //states
        modeStyle,
        //actions
        setModeStyle
    }
}