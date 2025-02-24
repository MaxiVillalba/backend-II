const userSchema = new Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true },
    email: { type: String, unique: true,  required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true },
})

// Metodo para verificar contraseña
userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password) };

export const userModel = model("user", userSchema);