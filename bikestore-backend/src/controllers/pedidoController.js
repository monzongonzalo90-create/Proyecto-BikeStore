export const realizarCheckout = async (req, res) => {
    try {
        // Lógica para registrar el pedido en la base de datos
        return res.status(201).json({ mensaje: "¡Pedido realizado con éxito!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};