import React, { FC, useState } from 'react';
import s from "./Dispaly.module.css";

type DisplayType = {
  value: string;
  calculatedExpression: string;
};

export const Dispaly: FC<DisplayType> = ({ value, calculatedExpression }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.number}>
        <input value={value} className={s.input} type="text" disabled />
      </div>
      <div className={s.text}>{calculatedExpression}</div>
    </div>
  );
};

export default Dispaly;