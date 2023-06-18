import {useState, useCallback} from 'react';
import { authService } from 'services/auth/authService';
import { tokenService } from 'services/auth/tokenService';
import { useDispatch } from "react-redux";
import { setUserData } from '../../src/store/userSlice';
import { setAuthState } from '../../src/store/authSlice';

export function useLocalStorage(key, initialValue={}) {
  const dispatch = useDispatch();
  const [state, setState] = useState(async () => {
    try {
      const storedValue = localStorage.getItem(key);

      const token = tokenService.get(null);
      const session = await authService.session(token);

      const userData = await authService.userData(session.data.body.id);

      if(session.data.body.id) {
        dispatch(setAuthState(true))
        dispatch(setUserData(userData))
        return JSON.parse(storedValue)
      } else {
        return initialValue;
      }
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setState(value);
      dispatch(setUserData(value))
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);

      return error;
    }
  }, [key])


  return [state, setValue];
}