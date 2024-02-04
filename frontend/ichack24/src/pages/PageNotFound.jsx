import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../style/home.scss";

const PageNotFound = () => {
  return (
    <div className="home-styling">
      <section className="hero is-secondary">
        <div className="hero-body">
          <p className="title has-text-centered">Error 404: Page not found.</p>
          <p className="subtitle has-text-centered">
            You probably aren't meant to be here. Click the button below to
            return home!
          </p>
          <p className="has-text-centered">
            <button
              className="button is-danger"
              onClick={() => {
                window.location.replace(
                  window.location.protocol + "//" + window.location.host
                );
              }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faHome} />
              </span>
              <p>Return Home</p>
            </button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
