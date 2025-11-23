// server.js

require('dotenv').config();  // Cargar variables del .env localmente (no subirlo a GitHub)
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();
app.use(cors());
app.use(express.json());

// Inicializar cliente Groq con la API Key desde la variable de entorno
const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Endpoint para resolver ejercicios de física
app.post("/resolverIA", async (req, res) => {
    try {
        const texto = req.body.prompt || "";

        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: "Eres una IA que resuelve ejercicios de física paso a paso, con cálculos claros y explicaciones." },
                { role: "user", content: texto }
            ],
            temperature: 0.2
        });

        const respuesta = response.choices[0].message.content;
        res.json({ respuesta });

    } catch (error) {
        console.error(error);
        res.status(500).json({ respuesta: "Error al comunicarse con la IA." });
    }
});

// Usar el puerto que Render asigna o 3000 localmente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor IA activo en http://localhost:${PORT}`);
});
