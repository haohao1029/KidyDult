// parseLogFile.ts
const parseLogFile = async (file: File): Promise<Record<string, number>> => {
  const text = await file.text();
  const lines = text.split('\n');

  const userMessageCount: Record<string, number> = {};

  let currentUser: string | null = null;

  lines.forEach(line => {
    const match = line.match(/<(.+?)>/);
    line = line.replace(/<.+?>/, '');
    const count = line.split(' ').length;
    if (match) {
      currentUser = match[1];
      userMessageCount[currentUser] = (userMessageCount[currentUser] || 0) + count - 1;
    } else if (currentUser) {
      userMessageCount[currentUser] += count;
    }
  });

  return userMessageCount;
};

export default parseLogFile;
