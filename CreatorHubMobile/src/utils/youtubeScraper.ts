import { Channel } from "../types/Channel";

export async function fetchChannelByHandle(handle: string): Promise<Channel> {
  const apiURL = "https://yt.lemnoslife.com/channels?handle=" + handle;
  const response = await fetch(apiURL);
  if (!response.ok) {
    throw new Error("Failed to fetch channel information");
  }
  const data = await response.json();
  if (!data || !data[0]) {
    throw new Error("Channel not found for the provided handle");
  }
  const channelData = data[0];
  const channel: Channel = {
    id: channelData.id || Date.now().toString(),
    name: channelData.title,
    description: channelData.description || "No description available",
    subscriberCount: Number(channelData.subscriberCount) || 0,
    videoCount: Number(channelData.videoCount) || 0,
    totalViews: Number(channelData.viewCount) || 0,
    thumbnail: channelData.thumbnails && channelData.thumbnails.length > 0 ? channelData.thumbnails[0].url : "https://via.placeholder.com/150",
    isConnected: true,
    createdAt: channelData.publishedAt || new Date().toISOString(),
    lastSyncAt: new Date().toISOString(),
  };
  return channel;
}
