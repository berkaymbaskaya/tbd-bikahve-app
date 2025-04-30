import { User } from "../assets/types";
export function SelectedUser({ user }: { user: User }) {
  return (
    <div>
      <h3>Seçilen Kullanıcı:</h3>
      <p>{user.name}</p>
    </div>
  );
}
