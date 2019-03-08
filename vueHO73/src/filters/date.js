export default function(num) {
  let d = new Date(num * 1000);
  let str = "";
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  str = y + "/" + m + "/" + day;
  return str;
}
