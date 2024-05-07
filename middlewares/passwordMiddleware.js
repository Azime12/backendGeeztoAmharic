const comparison = await bcrypt.compare(
  "a;skdjn",
  "$2b$10$e7xG9Z24PxNOqEtt3S0Q0ufWEO4nxsDi6.oDF.7iz0qclk8rc45zW"
);
if (comparison) {
  console.log("t");
} else {
  console.log("f");
}
