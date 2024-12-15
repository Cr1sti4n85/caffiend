import { useState } from "react";

function Authentication() {
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function handleAuthenticate() {}

  return (
    <>
      <h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
      <p>{isRegistration ? "Create an account" : "Sign in to your account!"}</p>
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
        <p>Submit</p>
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
