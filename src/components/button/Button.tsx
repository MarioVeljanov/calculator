import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type ButtonType = DefaultButtonPropsType & {
    text: string
    xType?: string
}

const Button: FC<ButtonType> = ({text, xType, ...restProps}) => {
    const finalClassName = s.button 
                        + (xType === 'black' 
                            ? ' ' + s.black 
                            : xType === 'white'
                            ? ' ' + s.white
                            : xType === 'zero'
                            ? ' ' + s.zero
                            : '' )
    return (
      <div className={s.wrapper}>
        <button className={finalClassName} {...restProps}>{text}</button>
      </div>
    );
};

export default Button;