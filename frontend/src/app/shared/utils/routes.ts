export const getBaseHref = () => {
  const element = document.getElementsByTagName('base').item(0);
  const baseHref = element?.href;
  if (!baseHref) {
    return '';
  }

  const url = new URL(baseHref);
  let pathName = url.pathname;

  if (pathName.endsWith('/')) {
    pathName = pathName.substring(0, pathName.length - 1);
  }

  return pathName;
};
