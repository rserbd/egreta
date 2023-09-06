import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Data";
import Footer from "../components/home/Footer";
import PopUp from "../components/pop-up/PopUp";

const Login = () => {
  const { loginImg } = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [showPopUp, setShowPopUp] = useState(false);
  const handleOnClose = (e) => {
    setShowPopUp(false);
  };
  const [displayMessage, setDisplayMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const content = await response.json();
      setDisplayMessage(content.message);
      setShowPopUp(true);

      if (response.ok) {
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex max-w-4xl p-5">
          <div className="m-auto sm:block hidden w-1/2">
            <img src={loginImg} alt="authImg" />
          </div>
          <div className="sm:w-1/2 px-5">
            <h1 className="h2">Bine ai venit la Egreta</h1>
            <p className="lead mt-2">Loghează-te cu contul tău aici</p>
            <form className="flex flex-col gap-5" onSubmit={submit}>
              <input
                type="email"
                className="p-2 mt-8 rounded-2xl border-2"
                placeholder="Adresă Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="p-2 rounded-2xl border-2"
                placeholder="Parolă"
                required
                minlength="8"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-md btn-outline">Login</button>
            </form>
            <hr className="h-px my-8 bg-gray-200 border-0" />
            <p className="text-sm text-gray-400">Creează un cont</p>
            <div className="flex justify-between">
              <a className="text-accent" href="/signUp">
                Register
              </a>
              <a className="text-accent" href="/">
                Înapoi Acasă
              </a>
            </div>
          </div>
        </div>
      </div>
      {showPopUp && (
        <PopUp
          onClose={handleOnClose}
          visible={showPopUp}
          displayMessage={displayMessage}
        ></PopUp>
      )}
      <div>
        <Footer></Footer>
      </div>
    </section>
  );
};

export default Login;
