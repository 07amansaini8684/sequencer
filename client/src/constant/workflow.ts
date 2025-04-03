export const initialNodes = [
    {
        id: "1",
        type: "input",
        data: { label: "Start Node" },
        position: { x: 250, y: 5 },
        animated: true,

    },
    {
        id: "2",
        data: { label: "Middle Node" },
        position: { x: 250, y: 100 },
        animated: true,

    },
    {
        id: "3",
        type: "output",
        data: { label: "End Node" },
        position: { x: 250, y: 200 },
        animated: true,
    },
];

export const initialEdges = [
    { id: "1-2", source: "1", target: "2", animated: true },
    // { id: "e2-3", source: "2", target: "3", animated: true },
];