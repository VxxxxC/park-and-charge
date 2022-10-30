const data = require("./data.json");
const list = data.res;

let districtList = [];

const filterDistrict = (input) => {
  list.map((item) => {
    if (Object.hasOwn(item, "address") && item.address.dcDistrict == input) {
      return districtList.push(item);
    }
    if (Object.hasOwn(item, "district") && item.district == input) {
      return districtList.push(item);
    }
  });
};

filterDistrict("東區");
console.log(districtList);
