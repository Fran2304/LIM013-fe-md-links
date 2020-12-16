// ---------- test ---------------------------
const optionStatsOnly = (links) => {
  const totalLinks = links.length;
  const onlyHref = [];
  links.forEach((link) => {
    onlyHref.push(link.href);
  });
  const set1 = new Set(onlyHref);
  const unique = [...set1];
  const result = `Total Links:${totalLinks}Unique Links: ${unique.length}`;
  return result;
};

const optionStatsVal = (links) => {
  const validLinks = [];
  const brokenLinks = [];
  links.forEach((link) => {
    if (link.status >= 200 && link.status <= 400) {
      validLinks.push(link.href);
    } else {
      brokenLinks.push(link.href);
    }
  });
  const result = `${optionStatsOnly(links)}Valid Links:${validLinks.length}Broken Links:${brokenLinks.length}`;
  return result;
};
module.exports = {
  optionStatsVal, optionStatsOnly,
};
