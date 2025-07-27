import { Channel } from '../types/Channel';

export const removeDuplicateChannels = (channels: Channel[]): Channel[] => {
  const seen = new Set<string>();
  const uniqueChannels: Channel[] = [];
  
  for (const channel of channels) {
    // Create a unique key based on channel ID and name
    const key = `${channel.id}-${channel.name.toLowerCase()}`;
    
    if (!seen.has(key) && !seen.has(channel.id) && !uniqueChannels.some(c => 
      c.name.toLowerCase() === channel.name.toLowerCase() ||
      c.id === channel.id
    )) {
      seen.add(key);
      seen.add(channel.id);
      uniqueChannels.push(channel);
    }
  }
  
  return uniqueChannels;
};

export const findExistingChannel = (channels: Channel[], handle: string, channelId?: string): Channel | undefined => {
  return channels.find(c => 
    c.name.toLowerCase() === handle.toLowerCase() ||
    c.name.toLowerCase().includes(handle.toLowerCase()) ||
    c.id === handle ||
    (channelId && c.id === channelId)
  );
};
