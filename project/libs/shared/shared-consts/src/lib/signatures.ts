const ImageFileSignatures = {
  jpeg: 'ff d8',
  png: '89 50',
};

export const signatures = [ImageFileSignatures.jpeg, ImageFileSignatures.png];

export enum Extensions {
  jpeg = 0xff,
  png = 0x89
}
