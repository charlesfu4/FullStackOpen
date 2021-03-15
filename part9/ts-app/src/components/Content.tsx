import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

const Content = ({ parts } : { parts: CoursePart[]}) => (
  <div>
    <Part parts={parts} />
  </div>
);

export default Content;