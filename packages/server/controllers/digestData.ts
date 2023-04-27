import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import {
  JSONLoader,
  JSONLinesLoader,
} from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { EPubLoader } from "langchain/document_loaders/fs/epub";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { SRTLoader } from "langchain/document_loaders/fs/srt";

export const createIndex = async (sourceDirectory: string) => {
  const docs = await loadDocs(sourceDirectory);
  // console.log("docs", docs);
  console.log("sourceDirectory", sourceDirectory);
  /* Create the vectorstore */
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  await vectorStore.save(sourceDirectory);
  return vectorStore;
};

export const loadExistingIndex = async (sourceDirectory: string) => {
  const loadedVectorStore = await HNSWLib.load(
    sourceDirectory,
    new OpenAIEmbeddings()
  );

  return loadedVectorStore;
};

export const loadDocs = async (directory: string) => {
  const loader = new DirectoryLoader(directory, {
    ".json": (path) => new JSONLoader(path, "/texts"),
    ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
    ".txt": (path) => new TextLoader(path),
    ".csv": (path) => new CSVLoader(path, "text"),
    ".docx": (path) => new DocxLoader(path),
    ".epub": (path) => new EPubLoader(path),
    ".pdf": (path) => new PDFLoader(path),
    ".srt": (path) => new SRTLoader(path),
  });
  const docs = await loader.load();
  return docs;
};
