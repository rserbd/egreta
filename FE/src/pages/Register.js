import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Data";
import Footer from "../components/home/Footer";
import PopUp from "../components/pop-up/PopUp";

const Register = () => {
  const { signupImg } = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const [showPopUp, setShowPopUp] = useState(false);
  const handleOnClose = (e) => {
    setShowPopUp(false);
  };
  const [displayMessage, setDisplayMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          passwordConfirm,
        }),
      });
      const content = await response.json();
      setDisplayMessage(content.message);
      setShowPopUp(true);

      if (response.ok) {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="min-h-screen flex justify-center items-center ">
        <div className="flex max-w-4xl p-5">
          <div className="m-auto sm:block hidden w-1/2">
            <img src={signupImg} alt="authImg" />
          </div>
          <div className="px-5">
            <h1 className="h2">Creează un cont</h1>
            <p className="lead mt-2">Evadează orașul și hai în natură</p>
            <form className="flex flex-col gap-5" onSubmit={submit}>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="p-2 rounded-2xl border-2"
                  placeholder="Prenume"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="p-2 rounded-2xl border-2"
                  placeholder="Nume"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <input
                type="text"
                className="p-2 rounded-2xl border-2"
                placeholder="Număr telefon"
                minlength="10"
                maxLength="15"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <input
                type="email"
                className="p-2 rounded-2xl border-2"
                placeholder="Adresă Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex gap-2">
                <input
                  type="password"
                  className="p-2 rounded-2xl border-2"
                  placeholder="Parolă"
                  required
                  minlength="8"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <input
                  type="password"
                  className="p-2 rounded-2xl border-2"
                  placeholder="Confirmă Parola"
                  required
                  minlength="8"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
              <p className="text-sm lead">
                (Lungime minimă pentru parolă: 8 caractere)
              </p>

              <button className="btn btn-md btn-outline">Crează Cont</button>
            </form>
            <hr className="h-px my-8 bg-gray-200 border-0" />
            <p className="text-sm text-gray-400">Deja ai cont?</p>
            <div className="flex justify-between">
              <a className="text-accent" href="/login">
                Login
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

export default Register;
