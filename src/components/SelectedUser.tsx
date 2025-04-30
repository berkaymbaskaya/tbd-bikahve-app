import { User } from "../types";
export function SelectedUser({ user }: { user: User }) {
    return (
      <div className="card">
        <h3>Seçilen Kullanıcı</h3>
        <p>{user.name}</p>
      </div>
    );
  }
