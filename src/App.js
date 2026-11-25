import React, { useEffect, useState } from 'react';
import Portfolio from './components/Portfolio';
import CaseStudy from './components/CaseStudy';

// Hash routes keep GitHub Pages happy: #/case/<id> opens a case study,
// any other hash (#work, #contact, ...) is a section on the main page.
const caseId = () => {
  const m = window.location.hash.match(/^#\/case\/([\w-]+)/);
  return m ? m[1] : null;
};

export default function App() {
  const [id, setId] = useState(caseId);

  useEffect(() => {
    const onHash = () => setId(caseId());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return id ? <CaseStudy id={id} /> : <Portfolio />;
}
