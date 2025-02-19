interface User {
  id: string;
  name: string;
}

const { get } = useApi<User>('/users');

// This will return User directly, not ApiResponse<User>
const user = await get({ id: '123' });
console.log(user.name); // TypeScript knows this is a string