let _ScratchBlocks = null;

const isLoaded = () => !!_ScratchBlocks;

const get = () => {
    if (!isLoaded()) {
        throw new Error('scratch-blocks is not loaded yet');
    }
    return _ScratchBlocks;
};

const load = () => {
    if (_ScratchBlocks) {
        return Promise.resolve();
    }
    return import(/* webpackChunkName: "scratch-blocks" */'scratch-blocks')
        .then(m => {
            _ScratchBlocks = m.default;
            return _ScratchBlocks;
        });
};

export default {
    get,
    isLoaded,
    load
};
