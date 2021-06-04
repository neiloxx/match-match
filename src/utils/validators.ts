export const validateName = (name: string): boolean => {
  return (
    /^(?=.*\p{L}+)(?=.*[\d]*)[\p{L}0-9 ]{1,30}$/gu.test(name) &&
    name.trimLeft().length === name.length
  );
};

export const validateEmail = (email = ''): boolean => {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
};
