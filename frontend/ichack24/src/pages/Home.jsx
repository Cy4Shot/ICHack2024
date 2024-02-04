import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import artwork from "./../images/artwork.png";
import { faDashboard, faRocket } from "@fortawesome/free-solid-svg-icons";
import "./../style/home.scss";

const Home = () => {
  return (
    <div className="home-styling">
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-flex is-align-items-center">
                <div className="content pl-3" style={{ paddingRight: "4rem" }}>
                  <h1 style={{
                    fontSize: "6em",
                    fontWeight: "bold",
                    color: "black",
                  }}>
                    map.it
                  </h1>
                  <p className="is-size-3">Powering potential business owners to take the leap.</p>
                  <a href="/form" className="button is-primary is-large">
                    <span className="icon">
                      <FontAwesomeIcon icon={faRocket} />
                    </span>
                    <span>Create your Business</span>
                  </a>
                </div>
              </div>
              <div className="column is-flex is-align-items-center">
                <img src={artwork} alt="Market Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
