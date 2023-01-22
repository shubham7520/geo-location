import "./Auth.css";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Auth = (props) => {
  const userRef = useRef();
  const errRef = useRef();
  const [reg, setReg] = useState(false);
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const handleGoogle = async (google) => {
    await axios
      .post("/auth/google", {
        credential: google.credential,
      })
      .then((res) => {
        setEmail("");
        setPwd("");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("email", res.data.user.email);
        props.isLog(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Somthing went wrong");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      });
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [name, pwd, matchPwd]);

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      // google.accounts.id.renderButton(document.getElementById("googleDiv"), {
      //   // type: "standard",
      //   theme: "filled_black",
      //   // size: "small",
      //   text: "continue_with",
      //   shape: "pill",
      // });

      google.accounts.id.prompt();
    }
  }, []);

  const handleSubmit = async (e) => {
    console.log("dome");
    e.preventDefault();
    // if button enabled with JS hack
    // const v2 = PWD_REGEX.test(pwd);
    // if (!v2) {
    //   setErrMsg("Invalid Entry");
    //   return;
    // }
    let requestBody = reg
      ? {
        name,
        email,
        password: pwd,
        role: "teacher",
      }
      : { email, password: pwd };
    const url = reg ? "/auth/signUp" : "/auth/login";
    await axios
      .post(url, requestBody)
      .then((res) => {
        setEmail("");
        setPwd("");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("email", res.data.user.email);
        props.isLog(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Somthing went wrong");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      });
  };

  return (
    <section className="register-outer-container">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>{reg ? "Register" : "Login"}</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        {reg && (
          <label className="label" htmlFor="username">
            Name:
          </label>
        )}
        {reg && (
          <input
            className="register-input"
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
        )}

        <label className="label" htmlFor="username">
          Email:
        </label>
        <input
          className="login-input"
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <label className="label" htmlFor="password">
          Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPwd || !pwd ? "hide" : "invalid"}
          />
        </label>
        <input
          className="register-input"
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        {reg && (
          <label className="label" htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
            />
          </label>
        )}
        {reg && (
          <input
            className="register-input"
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
        )}
        {reg && (
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
        )}

        <button
          className="sign-up-btn"
        // disabled={!validPwd || !validMatch ? true : false}
        >
          {reg ? "Sign Up" : "Login"}
        </button>
        {/* <div id="googleDiv"></div> */}
      </form>
      <div className="already">
        {reg ? "Already registered?" : "Need an Account?"}
        <br />
        <h4 style={{ cursor: "pointer" }}
          onClick={() => {
            setReg((prev) => !prev);
          }}
        >
          {reg ? "Sign In" : "Sign Up"}
        </h4>
      </div>
    </section>
  );
};

export default Auth;
