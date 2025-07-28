// genera documentacion JSDoc

/**
 * Envía una petición al modelo de OpenAI utilizando el cliente proporcionado.
 *
 * @param {import('openai').OpenAI} client - Instancia del cliente de OpenAI configurada para realizar peticiones.
 * @param {string} text - Texto que se enviará como prompt al modelo de lenguaje.
 * @returns {Promise<any>} Respuesta generada por el modelo de OpenAI.
 */
const sendGpt = async (client, text) => {
  const response = await client.responses.create({
    model: "gpt-4o",
    instructions:
      "Eres un chat programado para ayudar. Debes responder de forma simple y con humor. La respuesta debe ser un string simple y puede contener etiquetas básicas de HTML",
    input: text,
  });
  return response.output_text;
};

module.exports = { sendGpt };
