import mongoose from "mongoose";


export const connectToDatabase = async() => {
    await mongoose.connect("mongodb+srv://ankitapaul979_db_user:qioN8ivwF3FdJpKC@cluster0.nkvshtz.mongodb.net/?appName=Cluster0")
    .then((res) => console.log("db is connected"))
    .catch((err) => console.log(err))
}