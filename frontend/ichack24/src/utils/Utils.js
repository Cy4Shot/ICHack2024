import { useCallback, useEffect, useRef, useState } from "react";

export function location() {
  let url = window.location.href;
  return url.substring(url.lastIndexOf("/") + 1).split("?")[0];
}

export function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null);

  const setStateCallback = useCallback((state, cb) => {
    cbRef.current = cb;
    setState(state);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, setStateCallback];
}

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}
