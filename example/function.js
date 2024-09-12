//FUNCTION NON RETURN
function generate_nama(nama, mobile) {
  console.log(`Nama saya adalah ${nama}, nomor telp saya adalah ${mobile}`);
}

generate_nama("Aditya", "081320100407");
generate_nama("Zakiy", "0813123123123");

//FUNCTION RETURN
function generate_nama_return(nama, mobile) {
  text = `Nama saya adalah ${nama}, nomor telp saya adalah ${mobile}`;
  return text;
}

const result = generate_nama_return("Kunto", "081987987987");
console.log(result);
