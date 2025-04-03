import { create } from 'zustand';
import { Node, Edge, MarkerType } from '@xyflow/react';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  updateNode: (nodeId: string, data: any) => void;
  setSelectedNode: (node: Node | null) => void;
}

const useStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  setNodes: (nodes) => set((state) => ({ 
    nodes: typeof nodes === 'function' ? nodes(state.nodes) : nodes 
  })),
  setEdges: (edges) =>
    set((state) => ({
      edges:
        typeof edges === "function"
          ? edges(state.edges).map((edge) => ({
              ...edge,
              animated: true,
              markerEnd: { type: MarkerType.Arrow }, // ✅ Corrected
            }))
          : edges.map((edge) => ({
              ...edge,
              animated: true,
              markerEnd: { type: MarkerType.Arrow }, // ✅ Corrected
            })),
    })),
  updateNode: (nodeId, newData) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      ),
    })),
  setSelectedNode: (node) => set({ selectedNode: node }),
}));

export default useStore;
