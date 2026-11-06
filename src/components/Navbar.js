import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Movies</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/add-movie">Add Movie</Link>
    </nav>
  );
}

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "15px",
        background: "#333",
        color: "#fff",
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
        მთავარი
      </Link>
      <Link to="/favorites" style={{ color: "#fff", textDecoration: "none" }}>
        ფავორიტები
      </Link>
      <Link to="/add-movie" style={{ color: "#fff", textDecoration: "none" }}>
        ფილმის დამატება
      </Link>

      {!token ? (
        <>
          <Link
            to="/login"
            style={{
              color: "#fff",
              textDecoration: "none",
              marginLeft: "auto",
            }}
          >
            შესვლა
          </Link>
          <Link
            to="/register"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            რეგისტრაცია
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          style={{ marginLeft: "auto", cursor: "pointer" }}
        >
          გამოსვლა
        </button>
      )}
    </nav>
  );
}
