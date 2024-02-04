import Dashboard from "../pages/Dashboard";
import Form from "../pages/Form";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";

const sitemap = {
    "": <Home />,
    "404": <PageNotFound />,
    "form": <Form />,
    "dashboard": <Dashboard />,
};

export function getPage(url) {
    return url in sitemap ? sitemap[url] : <PageNotFound />;
}