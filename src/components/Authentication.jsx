import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Authentication(props) {
  const { handleCloseModal } = props;
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);

  const { signup, login } = useAuth();

  async function handleAuthenticate() {
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.length < 6 ||
      isAuthenticating
    ) {
      return;
    }

    try {
      setIsAuthenticating(true);
      setError(null);
      if (isRegistration) {
        //register a user
        await signup(email, password);
      } else {
        //login user
        await login(email, password);
      }

      handleCloseModal();
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <>
      <h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
      <p>{isRegistration ? "Create an account" : "Sign in to your account!"}</p>
      {error && <p>❌ {error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="************"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleAuthenticate}>
        <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
      </button>
      <hr />
      <div className="register-container">
        <p>
          {isRegistration
            ? "Already have an account"
            : "Don't have an account?"}
        </p>
        <button
          onClick={() => {
            setIsRegistration(!isRegistration);
          }}
        >
          <p>{isRegistration ? "Sign In" : "Sign Up"}</p>
        </button>
      </div>
    </>
  );
}

export default Authentication;
