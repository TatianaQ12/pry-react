type TabsProps = {
   childrenOne?: React.ReactNode,
   childrenTwo?: React.ReactNode,
   childrenThree?: React.ReactNode,
   variant?: string,
   labels: Array<any>,
   color?: string,
   tabValidate?: number,
   setTabValidate?: (n:number)=>void,
   errorForm?: boolean,
   classMore?: string,
   setValueForm?:React.Dispatch<React.SetStateAction<number>>,
   setTabValue?: (n:number)=>void
}

export type Props = TabsProps;
