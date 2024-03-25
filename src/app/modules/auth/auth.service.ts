const loginUser = async (payload: { username: string; password: string }) => {
   console.log('logging in', payload);
   return {
      token: 'random token id',
   };
};

export const authService = {
   loginUser,
};
