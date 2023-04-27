import { Response } from "express";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import Chat from "../models/chat";
import User from "../models/user";
import { IRequest } from "../types";
import { getUserUploadsFolderPath } from "../utils";
import { createIndex, loadExistingIndex } from "./digestData";

export const uploadFiles = async (req: IRequest, res: Response) => {
  try {
    const userId = req.token?.id;
    const files = req.files as any;
    console.log("files", files);
    if (!files?.length)
      return res
        .status(400)
        .json({ message: "Files not attached. Please send files" });

    if (!userId)
      return res
        .status(403)
        .json({ message: "Invalid user. Please login again" });

    const fileNames = files.map((file: any) => file.filename);
    console.log("fileNames", fileNames);

    const user = await User.findByPk(userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "User not found. Try logging in again" });

    user.files = user.files ? [...user.files, ...fileNames] : fileNames;
    await user.save();
    return res.status(200).json({ message: "Uploaded" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const indexFiles = async (req: IRequest, res: Response) => {
  try {
    const userId = req.token?.id;
    if (!userId)
      return res
        .status(403)
        .json({ message: "Invalid user. Please login again" });

    const directory = getUserUploadsFolderPath(userId);
    const vStore = await createIndex(directory);
    return res.status(200).json({ message: "Data ingested" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendQuestions = async (req: IRequest, res: Response) => {
  try {
    const userId = req.token?.id;
    const { question } = req.body;

    if (!question?.trim()) {
      return res.status(400).json({ message: "Please provide you question." });
    }

    if (!userId)
      return res
        .status(403)
        .json({ message: "Invalid user. Please login again" });

    const chats = await Chat.findAll({ where: { userId } });
    const chatHistory = chats.map((chat) => chat.question + chat.response);

    const directory = getUserUploadsFolderPath(userId);
    const vStore = await loadExistingIndex(directory);

    if (!vStore)
      return res.status(500).json({ message: "Could not load a doc store" });

    const model = new OpenAI({});

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vStore.asRetriever()
    );

    const chatResponse = await chain.call({
      question,
      chat_history: chatHistory,
    });
    console.log("chatResponse", chatResponse);
    chatHistory.push(question + chatResponse?.text);

    await Chat.create({ question, response: chatResponse?.text, userId });
    return res.status(200).json({ message: chatResponse?.text });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
