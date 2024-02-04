import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import artwork2 from "./../images/artwork2.png";
import {
  faBriefcase,
  faChartLine,
  faCity,
  faClock,
  faDollar,
  faGlobe,
  faHouse,
  faHouseChimney,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./../style/form.scss";

const data = [
  "Restaurants & Food Services",
  "Entertainment & Leisure",
  "Automotive (Vehicles and Services)",
  "Health & Beauty (Wellness and Personal Care)",
  "Groceries & Food Retail",
  "Clothing & Apparel",
  "Electronics & Appliances",
  "Home Improvement & Furnishings",
  "Travel & Tourism",
  "Education & Training",
  "Financial Services & Insurance",
  "Real Estate & Housing",
  "Technology & Software",
  "Sports & Fitness",
  "Arts & Crafts",
  "Pet Care & Products",
  "Utilities & Energy",
  "Transportation & Logistics",
  "Pharmaceuticals & Healthcare Products",
  "Agriculture & Food Production",
];

const filtered = (searchTerm) =>
  data.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));

const Form = () => {
  const [filteredData, setFilteredData] = useState([]);

  return (
    <div className="home-styling">
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="pl-3" style={{ paddingRight: "4rem" }}>
                  <div id="pageContainer">
                    <div id="page1" class="page">
                      <h1 className="title">1. Basic Information</h1>
                      <div className="field">
                        <label className="label">Business Name</label>
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            type="text"
                            placeholder="Enter a cool name..."
                            id="bname"
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faSignature} />
                          </span>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Country</label>
                        <div className="control has-icons-left">
                          <input
                            className="input is-success"
                            type="text"
                            placeholder="Where are you from?"
                            id="bcountry"
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faGlobe} />
                          </span>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">City / Region</label>
                        <div className="control has-icons-left">
                          <input
                            className="input is-success"
                            type="text"
                            placeholder="Where are you located?"
                            id="bcity"
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faCity} />
                          </span>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Business Type</label>
                        <div className="control has-icons-left">
                          <input
                            className="input is-success"
                            type="text"
                            placeholder="What do you do?"
                            id="btype"
                            onKeyUp={(event) => {
                              const searchTerm = event.target.value;
                              const filteredData = filtered(searchTerm);
                              setFilteredData(filteredData);
                            }}
                            onBlur={() => {
                              setTimeout(() => {
                                setFilteredData([]);
                              }, 200);
                            }}
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faBriefcase} />
                          </span>
                        </div>
                        <div
                          className="dropdown is-active"
                          style={{
                            display: filteredData.length > 0 ? "block" : "none",
                          }}
                        >
                          <div className="dropdown-menu">
                            <div className="dropdown-content">
                              {filteredData.map((item, index) => (
                                <a
                                  href="#"
                                  className="dropdown-item"
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setFilteredData([]);
                                    document.getElementById("btype").value =
                                      item;
                                  }}
                                >
                                  {item}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="field is-grouped mt-4"
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <div className="control">
                          <button
                            className="button is-link"
                            onClick={(e) => {
                              e.preventDefault();
                              document
                                .getElementById("page1")
                                .classList.add("hidden");
                              document
                                .getElementById("page2")
                                .classList.remove("hidden");

                              setTimeout(() => {
                                // Set Z index to 1 to make the page visible
                                document.getElementById(
                                  "page2"
                                ).style.zIndex = 1;
                              }, 500);
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>

                    <div id="page2" class="page hidden">
                      <h1 className="title">2. Financial Data</h1>
                      <div className="field">
                        <label className="label">Price of Goods</label>
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            type="text"
                            placeholder="How much are you selling your product for?"
                            id="bprice"
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faDollar} />
                          </span>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Price of Manufacture</label>
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            type="text"
                            placeholder="How much does it cost to make your product?"
                            id="bmanufacture"
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faHouseChimney} />
                          </span>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Initial Investments</label>
                        <div className="control has-icons-left">
                          <input
                            className="input is-success"
                            type="text"
                            placeholder="How much did you invest in your Business?"
                            id="binvest"
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faChartLine} />
                          </span>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Forecast Duration (Years)</label>
                        <div className="control has-icons-left">
                          <input
                            className="input is-success"
                            type="text"
                            placeholder="How far in the future would you like our model to predict?"
                            id="btime"
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faClock} />
                          </span>
                        </div>
                      </div>

                      <div
                        className="field is-grouped mt-4"
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <div className="control">
                          <button
                            className="button is-link"
                            onClick={(_) => {
                              const bname =
                                document.getElementById("bname").value;
                              const bcountry =
                                document.getElementById("bcountry").value;
                              const bcity =
                                document.getElementById("bcity").value;
                              const btype =
                                document.getElementById("btype").value;
                              const bprice =
                                document.getElementById("bprice").value;
                              const bmanufacture =
                                document.getElementById("bmanufacture").value;
                              const binvest =
                                document.getElementById("binvest").value;
                              const btime =
                                document.getElementById("btime").value;
                              localStorage.setItem(
                                "user_data",
                                JSON.stringify({
                                  name: bname,
                                  country: bcountry,
                                  city: bcity,
                                  type: btype,
                                  price: bprice,
                                  manufacture: bmanufacture,
                                  invest: binvest,
                                  time: btime,
                                })
                              );
                              window.location.href = "/dashboard";
                            }}
                          >
                            Find Location
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-flex is-align-items-center">
                <img src={artwork2} alt="artwork" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form;
