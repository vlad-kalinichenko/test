import { createContext, useContext } from 'react';
import { UserFormContextProps } from './UserForm.types';

export const UserFormContext = createContext<UserFormContextProps>({} as UserFormContextProps);

export const useUserFormContext = () => useContext(UserFormContext);
