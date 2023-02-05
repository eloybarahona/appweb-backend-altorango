import mongoose from 'mongoose'
    
const URI = process.env.URI_MONGO

try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URI)
    console.log('🍙🍙🍙 Base de datos conectada 🍙🍙🍙')
} catch (error) {
    console.log('Error de conexion: ' + error.message)
}
