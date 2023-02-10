export const makeDOMwithProperties = (domType, propertyMap) => {
  const dom = document.createElement(domType);
  Object.keys(propertyMap).forEach((key) => {
    dom[key] = propertyMap[key];
  });

  return dom;
};

export const appendChildrenList = (target, childrenList) => {
  if (!Array.isArray(childrenList)) return;

  childrenList.forEach((children) => {
    target.appendChild(children);
  }); //순환  log: target=productImageCon, childrenList=[productImage, cardToggleBtn]
  //1순환 children=productImage  productImageCon.appendChild(productImage)
  //2순환 children=cardToggleBtn productImageCon.appendChild(cardToggleBtn)
};
