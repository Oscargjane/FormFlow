'use client';

import { api } from "@/trpc/react";
import { RouterOutputs } from "@/trpc/react";
type User = RouterOutputs["users"]["all"][number];

interface UserListProps {
  initialUsers: User[];
}

export function UserList({ initialUsers }: UserListProps) {
  const { data: users } = api.users.all.useQuery(undefined, {
    initialData: initialUsers,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {users.length === 0 ? (
        <p>No hay usuarios en la base de datos.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}