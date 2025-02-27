import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserForm } from '@/pages';

const Routing: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/wizard/*" element={<UserForm />} />
    </Routes>
  );
};

export default Routing;
