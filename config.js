/** Common config for bookstore. */


let DB_URI;

if(process.env.NODE_ENV === "test"){
    DB_URI = "postgresql://postgres:Halo03117!@localhost:5432/books_test";
} else{
    DB_URI = "postgresql://postgres:Halo03117!@localhost:5432/books";
}


module.exports = { DB_URI };