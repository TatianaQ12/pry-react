import { FC, Fragment } from 'react'
import './styles.scss'

export const Error404: FC = () => {
  return (
    <Fragment >
      <div id="clouds" >
        <div className="cloud x1"></div>
        <div className="cloud x1_5"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
      </div>
      <div className='c'>
        <div className='_404'>404</div>
        <br />
        <div className='_1'>PÁGINA</div>
        <div className='_2'>NO FUE ENCONTRADA</div>
      </div>
    </Fragment>
  )
}
