const User = require('../../auth/models/userModel');

// Obtener datos del perfil
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el perfil", error });
    }
};

// Editar perfil
const editProfile = async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al editar el perfil", error });
    }
};

// Eliminar cuenta de usuario
const deleteAccount = async (req, res) => {
    const { password } = req.body;

    try {
        // Verificar la contraseña
        const user = await User.findById(req.user.id);
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Eliminar la cuenta
        await User.findByIdAndDelete(req.user.id);

        res.status(200).json({ message: "Cuenta eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la cuenta", error });
    }
};

module.exports = { getProfile, editProfile, deleteAccount };

