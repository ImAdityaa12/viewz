import { DocumentPickerAsset } from "expo-document-picker";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Models,
  Query,
  Storage,
} from "react-native-appwrite";
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aditya.viewz",
  projectId: "66b08ee600314574b646",
  databaseId: "66b090870007c4d8cb65",
  userCollectionId: "66b090b5001d6e7d8569",
  videosCollectionId: "66b090c0000cf7558a21",
  storageId: "66b0930c001b32c11485",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videosCollectionId,
  storageId,
} = appwriteConfig;
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Failed to create account", newAccount);
    const avatarUrl = avatar.getInitials(name);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        Email: email,
        username: name,
        Avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      return new Error(error.message);
    } else {
      throw new Error("Failed to create account");
    }
  }
};

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to sign in");
    }
  }
}
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Failed to get current account");
    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw new Error("Failed to get current account");
    return currentUser.documents[0];
  } catch (error) {
    throw new Error("Failed to get current account");
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videosCollectionId);
    return posts.documents;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to get posts");
    }
  }
};
export const getLatestPost = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to get posts");
    }
  }
};

export const searchPosts = async (text: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.search("title", text)]
    );
    return posts.documents;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to get posts");
    }
  }
};
export const userPosts = async (userId: string | undefined) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.equal("creator", userId || "")]
    );
    return posts.documents;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to get posts");
    }
  }
};

type Post = {
  title: string;
  video: DocumentPickerAsset;
  thumbnail: DocumentPickerAsset;
  prompt: string;
  creator: string | undefined;
};

export const getPreview = async (fileId: string, type: string) => {
  console.log("sdnjfds");
  let fileUrl;
  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else {
      throw new Error("Unsupported file type");
    }
    if (!fileUrl) {
      throw new Error("Failed to get file preview");
    }
    return fileUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to get file preview");
    }
  }
};
export const uploadFile = async (file: DocumentPickerAsset, type: string) => {
  if (!file) return;
  const { mimeType, ...rest } = file;
  const asset = {
    type: mimeType || "application/octet-stream",
    ...rest,
    size: file.size || 0,
  };
  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset as { name: string; type: string; size: number; uri: string }
    );
    const fileUrl = await getPreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
export const createPost = async (data: Post) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(data.thumbnail, "image"),
      uploadFile(data.video, "video"),
    ]);
    const newPost = await databases.createDocument(
      databaseId,
      videosCollectionId,
      ID.unique(),
      {
        title: data.title,
        video: videoUrl,
        thumbnail: thumbnailUrl,
        prompt: data.prompt,
        creator: data.creator,
      }
    );
    return newPost;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to create post");
    }
  }
};
