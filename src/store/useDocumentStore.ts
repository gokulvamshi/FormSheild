import { create } from 'zustand';
import type { Document } from '@/types/document';

interface DocumentStore {
  documents: Document[];
  setDocuments: (docs: Document[]) => void;
  addDocument: (doc: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  getDocumentByType: (type: string) => Document | undefined;
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  setDocuments: (docs) => set({ documents: docs }),
  addDocument: (doc) =>
    set((state) => ({ documents: [...state.documents, doc] })),
  updateDocument: (id, updates) =>
    set((state) => ({
      documents: state.documents.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    })),
  getDocumentByType: (type) => get().documents.find((d) => d.type === type),
}));
