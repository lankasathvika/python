import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles.css';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav class="navbar navbar-expand-sm navbar-light bg-light shadow">
      <div class="container">
        {/* <a class="navbar-brand col-1" href="">
          <span className=" fw-bold ">Job</span><span className="text-primary fw-bold">ify.</span>
        </a> */}
        <Link to='/' className="navbar-brand col-1"><span className=" fw-bold ">Medi</span><span className="text-primary fw-bold">Bot.</span></Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse  d-flex flex-row justify-content-between" id="navbarSupportedContent">
          <div className="col-lg-2 col-md-3 col-sm-2"></div>
          <ul class="navbar-nav mb-1 mb-lg-0 col-lg-6 col-sm-7    col-md-7 gap-sm-0">
            <li class="nav-item">
              {/* <a class="nav-link active fw-bold" aria-current="page" href="#">
                HOME
              </a> */}
              <Link to='/' class='nav-link active fw-bold'>HOME</Link>
            </li>
            <li class="nav-item">
              {/* <a class="nav-link fw-bold" href="#h3">
                JOBS
              </a> */}
              <Link to='Chatbot' class='nav-link fw-bold'>CHATBOT</Link>
            </li>
             <li class="nav-item">
              <Link to='/Video' className="nav-link fw-bold">YOURDOC</Link>
            </li>
            <li class="nav-item">
              {/* <a className="nav-link fw-bold" href="/about" >ABOUT US</a> */}
              <Link to='/DietPage' className="nav-link fw-bold">DIET PLAN</Link>
            </li>
            <li class="nav-item">
              {/* <a className="nav-link fw-bold" href="/about" >ABOUT US</a> */}
              <Link to='/Symptoms' className="nav-link fw-bold">SYMPTOM</Link>
            </li>
         
            <li class="nav-item">
              {/* <a className="nav-link fw-bold" href="/about" >ABOUT US</a> */}
              <a href="https://kit-react-eta.vercel.app" className="nav-link fw-bold">ABOUT</a>
            </li>
          </ul>
          <div className="col-lg-3 col- d-flex flex-row align-items-center gap-5">
            <Link className="btn border-primary" to='/signup'>Sign up</Link>
            <Link className="btn btn-primary " to='/login'>Sign in</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
