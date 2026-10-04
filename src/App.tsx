import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import { About, Approach, Article, CasePage, CaseStudies, Contact, Expertise, Industries, IndustryPage, Insights, Legal, NotFound, ServicePage } from "./pages/Pages";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="expertise" element={<Expertise />} />
          <Route path="expertise/:slug" element={<ServicePage />} />
          <Route path="industries" element={<Industries />} />
          <Route path="industries/:slug" element={<IndustryPage />} />
          <Route path="about" element={<About />} />
          <Route path="leadership" element={<About />} />
          <Route path="approach" element={<Approach />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="case-studies/:slug" element={<CasePage />} />
          <Route path="insights" element={<Insights />} />
          <Route path="insights/:slug" element={<Article />} />
          <Route path="contact" element={<Contact />} />
          <Route path="book" element={<Contact book />} />
          <Route path="privacy" element={<Legal kind="privacy" />} />
          <Route path="terms" element={<Legal kind="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
