import { Backdrop } from '@mui/material'
import './Loader.css'
import { useLoaderStore } from '@/hooks/useLoaderStore'


export const Loader = () => {
    const { openLoader } = useLoaderStore()
    return (
        // <Backdrop open={openLoader} sx={{ backgroundColor: 'white' }}>
        //     <div className="loading-wave">
        //         <div className="loading-bar"></div>
        //         <div className="loading-bar"></div>
        //         <div className="loading-bar"></div>
        //         <div className="loading-bar"></div>
        //     </div>
        // </Backdrop>
        
        <div className="loading-wave">
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
            </div>
    )
}

