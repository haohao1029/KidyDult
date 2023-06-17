import parseLogFile from './parseLogFile';

describe('parseLogFile', () => {
  beforeAll(() => {
    global.File = class MockFile {
      constructor(public contents: string[]) {
        this.name = 'mockFile.txt';
      }

      name: string;

      text() {
        return Promise.resolve(this.contents.join('\n'));
      }
    } as any;
  });

  it('counts the number of words each user says', async () => {
    const mockFile = new File([
      '<Alice> Hi Bob!',
      '<Bob> Hi Alice, how are you?',
      '<Alice> I\'m great, thanks for asking!',
      'Nice to hear that!',
    ], 'test.txt');

    const result = await parseLogFile(mockFile as any);

    expect(result).toEqual({
      Alice: 11,
      Bob: 5,
    });
  });

  it('handles empty lines and lines without a username', async () => {
    const mockFile = new File([
      '<Alice> Hi Bob!',
      '',
      'Hi Alice, how are you?',
      '<Alice> I\'m great, thanks for asking!',
      'Nice to hear that!',
    ], 'test.txt');

    const result = await parseLogFile(mockFile as any);

    expect(result).toEqual({
      Alice: 16,
    });
  });

  it('handles a file with no lines', async () => {
    const mockFile = new File([], 'test.txt');

    const result = await parseLogFile(mockFile as any);

    expect(result).toEqual({});
  });
});
