module.exports = {
  resolver: {
    assetExts: ['obj', 'mtl', 'jpg', 'png', 'fbx', 'glb', 'gltf'],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
