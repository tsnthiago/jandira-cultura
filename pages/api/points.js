// pages/api/points.js

export default function handler(req, res) {
    const points = [
        {
            title: "Ponto Turístico 1",
            description: "Descrição do ponto turístico 1",
            videoId: "abc123",
            tags: ["histórico", "cultura"]
        },
        {
            title: "Ponto Turístico 2",
            description: "Descrição do ponto turístico 2",
            videoId: "def456",
            tags: ["natureza", "parque"]
        }
    ];

    res.status(200).json(points);
}
